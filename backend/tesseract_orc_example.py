'''
SCRIPT TESTE PARA LEITURA DE IMAGENS
'''

import pytesseract
from PIL import Image


pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
image = Image.open('../static/media/extrato/extrato_itau.jpeg')
texto = pytesseract.image_to_string(image, lang='por', config='--psm 6')
print(float(texto.splitlines()[10].split(' ')[-1].replace('.', '').replace(',', '.')))