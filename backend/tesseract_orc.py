'''
SCRIPT TESTE PARA LEITURA DE IMAGENS
'''

import pytesseract
from PIL import Image


pytesseract.pytesseract.tesseract_cmd = r'/home/thomaschiari/miniconda3/bin/pytesseract'
image = Image.open('extrato_itau.jpeg')
texto = pytesseract.image_to_string(image, lang='por', config='--psm 6')
print(float(texto.splitlines()[10].split(' ')[-1].replace('.', '').replace(',', '.')))