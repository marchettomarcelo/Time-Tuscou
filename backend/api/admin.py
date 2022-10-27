from django.contrib import admin

from .models import Profile, Document, Category, Transaction

from rest_framework_simplejwt import token_blacklist
# Register your models here.


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken,
                    OutstandingTokenAdmin)


admin.site.register(Profile)

admin.site.register(Document)
admin.site.register(Category)
admin.site.register(Transaction)
