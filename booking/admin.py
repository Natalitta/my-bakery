from django.contrib import admin
from .models import MenuItem, BookItem
from django_summernote.admin import SummernoteModelAdmin


@admin.register(MenuItem)
class MenuItemAdmin(SummernoteModelAdmin):

    list_display = ('title', 'type', 'vegan')
    search_fields = ['title', 'content']
    list_filter = ('type', 'vegan')
    summernote_fields = ('content',)
