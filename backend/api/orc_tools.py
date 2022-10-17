import pytesseract
from PIL import Image
from pdf2image import convert_from_path

# pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
# image = Image.open('../static/media/extrato/extrato_itau.jpeg')
# texto = pytesseract.image_to_string(image, lang='por', config='--psm 6')
# print(float(texto.splitlines()[10].split(' ')[-1].replace('.', '').replace(',', '.')))

def treat_pdf(pdf_path, path_to_save):
    images = convert_from_path(pdf_path, dpi=300, output_folder=path_to_save)
    return images

def orc(path):
    if path.endswith('.pdf'):
        images = treat_pdf(path, path_to_save='../static/media/extrato/')
        list_img = [img for img in images]
    else:
        image = Image.open(path)
        pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
        context = {}
        image_text = pytesseract.image_to_string(image, lang='por', config='--psm 6')
        context['text'] = image_text
        context['lines'] = image_text.splitlines()
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

        print(context)
    #TODO: ORC - read file and create transactions

    return context

orc('../../static/media/extrato/extrato_itau.jpeg')