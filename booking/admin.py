from django.contrib import admin
from .models import MenuItem, Bookings
from django_summernote.admin import SummernoteModelAdmin


@admin.register(MenuItem)
class MenuItemAdmin(SummernoteModelAdmin):

    list_display = ('title', 'type', 'vegan')
    search_fields = ['title', 'content']
    list_filter = ('type', 'vegan')
    summernote_fields = ('content',)


@admin.register(Bookings)
class BookingAdmin(admin.ModelAdmin):
    # Class to view bookings on admin panel 
        list_display = (
            'pk',
            'customer',
            'booked_item',
            'number_of_items',
            'home_delivery',
            'booking_date',
            'booking_time'
        )
        search_fields = ['pk', 'booked_item', 'customer__username']
        list_filter = ('completed', 'booked_item', 'booking_time', 'booking_date')
