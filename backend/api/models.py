from django.db import models

# Create your models here.

class Profile(models.Model):
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
    account = models.ForeignKey(Bank_Account, on_delete=models.CASCADE)
    docfile = models.FileField(upload_to='documents/%Y/%m/%d')
    document_date = models.DateField()
    bank_name = models.CharField(max_length=100)
    bank_code = models.CharField(max_length=100)
    account_number = models.CharField(max_length=100)
    account_name = models.CharField(max_length=100)
    total_amount = models.CharField(max_length=100)

class Transaction(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.CharField(max_length=100, default = 'Sem Descrição')
    category = models.CharField(max_length=100, default ='Sem Categoria')
    amount = models.CharField(max_length=100)


