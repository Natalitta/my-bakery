from django.contrib import admin
from .models import MenuItem, Booking
from django_summernote.admin import SummernoteModelAdmin


@admin.register(MenuItem)
class MenuItemAdmin(SummernoteModelAdmin):

    list_display = ('title', 'vegan')
    search_fields = ['title', 'content']
    list_filter = ('vegan',)
    summernote_fields = ('content',)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    # Class to view bookings on admin panel
    list_display = (
        'pk',
        'customer',
        'booked_item',
        'number_of_items',
        'home_delivery',
        'booking_date',
        'booking_time',
        'completed'
        )
    search_fields = ['pk', 'completed', 'booked_item', 'customer__username']
    list_filter = ('completed', 'booked_item', 'booking_time', 'booking_date')
    actions = ['mark_completed']

    def mark_completed(self, request, queryset):
        queryset.update(approved=True)
