import pytesseract
from PIL import Image
from pdf2image import *
import tempfile
import cv2
import numpy as np

pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
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


def treat_pdf(pdf_path):
    images = convert_from_path(pdf_path, dpi=300)
    return images

def orc(path):
    if path.endswith('.pdf'):
        ## Exemplo de conversão de pdf para imagem que usariamos se implementassemos o upload de pdf
                # Para esta implementação funcionar, é preciso a instalação da livraria poppler
                # Um guia de instalação pode ser encontrado em https://pdf2image.readthedocs.io/en/latest/installation.html
        images = treat_pdf(path)
        list_img = [img for img in images]
        lower_bound = sorted([(np.sum(img.size), img.size) for img in list_img])[0][1]
        # Fazendo um stack de imagens, para que o OCR consiga ler como um único jpg
        vertical_stack = np.vstack((np.asarray(img.resize(lower_bound)) for img in list_img))
        vertical_stack = Image.fromarray(vertical_stack)
        if path.endswith('itau.pdf'):
            vertical_stack.save('../../static/media/extrato/extrato_itau.jpeg')
        else: vertical_stack.save('../../static/media/extrato/extrato_convertido.jpg')
        ## Extrato salvo no static, preparado para ser processado pelo pytesseract
        ## A partir daqui, o repartiria para o código que está escrito no else abaixo, só que o filename mudaria para o salvado acima

    if not path.endswith('.pdf') or path.endswith('extrato_itau.pdf'):  
        # Utilizando extrato_itau como exemplo, se o cliente mandou o extrato pdf,
        # o conversor de pdf acima é executado, depois o código abaixo
        path = '../../static/media/extrato/extrato_itau.jpeg'
        final_image = process_image_for_ocr(path)
        pytesseract.pytesseract.tesseract_cmd = r'/usr/local/bin/tesseract'
        context = {}
        image_text = pytesseract.image_to_string(final_image, lang='por', config='--psm 6')
        context['text'] = image_text
        context['lines'] = image_text.splitlines()
        # print(context['lines'][1].split(' ')[-1])
        
        if context['lines'][0].lower().find('itau'):
            context['bank'] = {
                'bank_name': 'Itaú',
                'bank_code': '341'
            }
            context['account'] = {
                'account_number': context['lines'][4].split(' ')[-1].replace('.', '').replace(',', '.'),
                'account_name': context['lines'][3].lower().replace('nome:','').strip()
        }
        elif context['lines'][0].lower().find('bradesco'):
            context['bank'] = {
                'bank_name': 'Bradesco',
                'bank_code': '237'
            }
        elif context['lines'][0].lower().find('banco do brasil'):
            context['bank'] = {
                'bank_name': 'Banco do Brasil',
                'bank_code': '001'
            }

        elif context['lines'][0].lower().find('santander'):
            context['bank'] = {
                'bank_name': 'Santander',
                'bank_code': '033'
            }
        elif context['lines'][0].lower().find('caixa'):
            context['bank'] = {
                'bank_name': 'Caixa',
                'bank_code': '104'
            }
        elif context['lines'][0].lower().find('nubank'):
            context['bank'] = {
                'bank_name': 'Nubank',
                'bank_code': '260'
            }
        
        context['transactions'] = []
        for line in context['lines']:

            if line.lower().find('saldo anterior') != -1:
                context['saldo_anterior'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('saldo final disponivel') != -1:
                context['saldo_atual'] = (line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('total de creditos') != -1:
                context['total_creditos'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('total de debitos') != -1:
                context['total_debitos'] = float(line.split(' ')[-1].replace('.', '').replace(',', '.'))
            elif line.lower().find('data') != -1 and line.lower().find('descricao') != -1 and line.lower().find('valor') != -1:
                context['header'] = line
            elif line.lower().find('data') == -1 and line.lower().find('descricao') == -1 and line.lower().find('valor') == -1:
                if line != '' and line.lower().find('nome') == -1 and line.lower().find('agência') == -1 and line.lower().find('extrato') == -1 and line.lower().find('saldo') == -1:
                    
                    if line.split(' ')[0].find('/') == -1:
                        if line.split(' ')[-1].replace('-','')[0] == '.':
                            
                            context['transactions'].append({
                                'data': line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[0:2] + '/' + line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[2:4],
                                'descricao': ' '.join(line.split(' ')[1:-1]),
                                'valor': float(line.split(' ')[-2]),
                                'category': 'Não categorizado'
                            })
                        else:
                            if line.split(' ')[-1].replace('-','').replace(',','.').count('.') > 1 :
                                context['transactions'].append({
                                    'data': line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[0:2] + '/' + line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[2:4],
                                    'descricao': ' '.join(line.split(' ')[1:-1]),
                                    'valor':float(line.split(' ')[-1].replace('-','').replace(',','.').replace('.','',1)),
                                    'category': 'Não categorizado'
                                })
                            else:
                                context['transactions'].append({
                                    'data': line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[0:2] + '/' + line.split(' ')[0].replace(';', '').replace('.', '').replace(',', '').replace(':','')[2:4],
                                    'descricao': ' '.join(line.split(' ')[1:-1]),
                                    'valor':float(line.split(' ')[-1].replace('-','').replace(',','.')),
                                    'category': 'Não categorizado'
                                })

                    else:
                        if line.split(' ')[-1].replace('-','')[0] == '.':
                                context['transactions'].append({
                                    'data': line.split(' ')[0],
                                    'descricao': ' '.join(line.split(' ')[1:-2]),
                                    'valor': float(line.split(' ')[-2]),
                                    'category': 'Não categorizado'
                                })
                        else:
                            if line.split(' ')[-1].replace('-','').replace(',','.').count('.') > 1 :
                                context['transactions'].append({
                                    'data': line.split(' ')[0],
                                    'descricao': ' '.join(line.split(' ')[1:-2]),
                                    'valor':float(line.split(' ')[-1].replace('-','').replace(',','.').replace('.','',1)),
                                    'category': 'Não categorizado'
                                })
                            else:
                                context['transactions'].append({
                                    'data': line.split(' ')[0],
                                    'descricao': ' '.join(line.split(' ')[1:-2]),
                                    'valor': float(line.split(' ')[-1].replace('-','').replace(',','.')),
                                    'category': 'Não categorizado'
                                })
        
                    
                    
    #TODO: ORC - read file and create transactions

    # return context['transactions'], context['bank'], context['account']

if __name__ == '__main__':
    orc('../../static/media/extrato/extrato_itau.jpg')

# imagem = orc('../static/media/extrato/extrato_itau.jpeg')
# print(imagem)