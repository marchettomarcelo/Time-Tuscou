from django.contrib import admin

from .models import Profile, Bank_Account, Document, Category, Transaction

# Register your models here.

admin.site.register(Profile)
admin.site.register(Bank_Account)
admin.site.register(Document)
admin.site.register(Category)
admin.site.register(Transaction)
