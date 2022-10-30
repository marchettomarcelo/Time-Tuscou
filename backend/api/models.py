from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    cpf = models.CharField(max_length=11, null=True, blank=True)

class Bank_Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bank_name = models.CharField(max_length=100)
    bank_code = models.CharField(max_length=100)
    account_number = models.CharField(max_length=100)
    account_name = models.CharField(max_length=100)
    
class Document(models.Model):

    doc_file = models.FileField(upload_to='documents/%Y/%m/%d')
    document_date = models.DateField()
    total_amount = models.CharField(max_length=100, default=0)


class Category(models.Model):
    CHOICES = (
        ('ENTRETENIMENTO', 'ENTRETENIMENTO'),
        ('ALIMENTACAO', 'ALIMENTACAO'),
        ('TRANSPORTE', 'TRANSPORTE'),
        ('SAUDE', 'SAUDE'),
        ("EDUCAÇÃO", "EDUCAÇÃO"),
        ('OUTROS', 'OUTROS'),

    )
    name = models.CharField(max_length=15, choices=CHOICES, default='OUTROS')


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # document is not required
    document = models.ForeignKey(
        Document, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField()
    description = models.CharField(max_length=100, default='Sem Descrição')
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    amount = models.CharField(max_length=100)

    def __str__(self):

        return f'{self.description} - R${self.amount} - {self.date}'


@receiver(post_save, sender=User)
def create_user_Perfil(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
