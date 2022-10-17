import pytesseract
from PIL import Image


# pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
# image = Image.open('../static/media/extrato/extrato_itau.jpeg')
# texto = pytesseract.image_to_string(image, lang='por', config='--psm 6')
# print(float(texto.splitlines()[10].split(' ')[-1].replace('.', '').replace(',', '.')))

def orc(path):
    pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
    context = {}
    image = Image.open(path)
    image_text = pytesseract.image_to_string(image, lang='por', config='--psm 6')
    context.update({'image_text': image_text})
    print(context)
    #TODO: ORC - read file and create transactions
    return context

orc('../../static/media/extrato/extrato_itau.jpeg')