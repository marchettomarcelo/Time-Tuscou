import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import tempfile
import cv2
import numpy as np

# pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
# image = Image.open('../static/media/extrato/extrato_itau.jpeg')
# texto = pytesseract.image_to_string(image, lang='por', config='--psm 6')
# print(float(texto.splitlines()[10].split(' ')[-1].replace('.', '').replace(',', '.')))

IMAGE_SIZE = 1800
BINARY_THRESHOLD = 180
def process_image_for_ocr(file_path):
    temp_filename = set_image_dpi(file_path)
    image_new = remove_noise_and_smooth(temp_filename)
    return image_new

def set_image_dpi(file_path):
    im = Image.open(file_path)
    length_x, width_y = im.size
    factor = max(1, int(IMAGE_SIZE / length_x))
    size = factor * length_x, factor * width_y
    # size = (1800, 1800)
    im_resized = im.resize(size, Image.ANTIALIAS)
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
    temp_filename = temp_file.name
    im_resized.save(temp_filename, dpi=(300, 300))
    return temp_filename

def image_smoothening(img):
    ret1, th1 = cv2.threshold(img, BINARY_THRESHOLD, 255, cv2.THRESH_BINARY)
    ret2, th2 = cv2.threshold(th1, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    blur = cv2.GaussianBlur(th2, (1, 1), 0)
    ret3, th3 = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return th3

def remove_noise_and_smooth(file_name):
    img = cv2.imread(file_name, 0)
    filtered = cv2.adaptiveThreshold(img.astype(np.uint8), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 41,
                                     3)
    kernel = np.ones((1, 1), np.uint8)
    opening = cv2.morphologyEx(filtered, cv2.MORPH_OPEN, kernel)
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)
    img = image_smoothening(img)
    or_image = cv2.bitwise_or(img, closing)
    return or_image


def treat_pdf(pdf_path, path_to_save):
    images = convert_from_path(pdf_path, dpi=300, output_folder=path_to_save)
    return images

def orc(path):
    if path.endswith('.pdf'):
        images = treat_pdf(path, path_to_save='../static/media/extrato/')
        list_img = [img for img in images]
    else:   
        final_image = process_image_for_ocr(path)
        pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
        context = {}
        image_text = pytesseract.image_to_string(final_image, lang='por', config='--psm 6')
        context['text'] = image_text
        context['lines'] = image_text.splitlines()
"""        
        if context['lines'][0].lower().find('itau'):
            context['bank'] = 'itau'
        elif context['lines'][0].lower().find('bradesco'):
            context['bank'] = 'bradesco'
        elif context['lines'][0].lower().find('banco do brasil'):
            context['bank'] = 'banco do brasil'
        elif context['lines'][0].lower().find('santander'):
            context['bank'] = 'santander'
        context['transactions'] = []
        for line in context['lines']:
            if line.lower().find('saldo anterior') != -1:
                context['saldo_anterior'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('saldo atual') != -1:
                context['saldo_atual'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('total de creditos') != -1:
                context['total_creditos'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('total de debitos') != -1:
                context['total_debitos'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('data') != -1 and line.lower().find('descricao') != -1 and line.lower().find('valor') != -1:
                context['header'] = line
            elif line.lower().find('data') == -1 and line.lower().find('descricao') == -1 and line.lower().find('valor') == -1:
                if line != '':
                    context['transactions'].append(line)
"""

        print(context)
    #TODO: ORC - read file and create transactions

    return context

orc('../../static/media/extrato/extrato_itau.jpeg')