from django.db import models

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    birth_date = models.DateField()
    phone = models.CharField(max_length=20)
    cpf = models.CharField(max_length=11)

class Bank_Account(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    bank_name = models.CharField(max_length=100)
    bank_code = models.CharField(max_length=100)
    account_number = models.CharField(max_length=100)
    account_name = models.CharField(max_length=100)

class Document(models.Model):
    account = models.ForeignKey(Bank_Account, on_delete=models.CASCADE, default=None)
    doc_file = models.FileField(upload_to='documents/%Y/%m/%d')
    document_date = models.DateField()
    total_amount = models.CharField(max_length=100, default=0)
class Category(models.Model):
    CHOICES = (
        ('1', 'ENTRETENIMENTO'),
        ('2', 'ALIMENTAÇÃO'),
        ('3', 'TRANSPORTE'),
        ('4', 'SAÚDE'),
        ('5', 'EDUCAÇÃO'),
        ('6', 'OUTROS'),
    )
    name = models.CharField(max_length=100, choices=CHOICES, default='6')

class Transaction(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, default=None)
    date = models.DateField()
    description = models.CharField(max_length=100, default='Sem Descrição')
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    amount = models.CharField(max_length=100)


