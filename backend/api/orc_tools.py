from PIL import Image
from pytesseract import pytesseract
import cv2

def orc(path):
    context = {}
    image = Image.open(path)
    image_text = pytesseract.image_to_string(image, lang='por', config='--psm 6')
    context.update({'image_text': image_text})
    #TODO: ORC - read file and create transactions
    return context
