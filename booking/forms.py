from .models import Booking
from django import forms


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ('booked_item', 'booking_name', 'number_of_items',
                  'booking_date', 'booking_time',)
        booking_date = forms.DateField(help_text="Please choose a future date")
        labels = {
            'booked_item': 'Cake',
            'booking_name': 'Name',
            'number_of_items': 'Number of cakes',
            'booking_date': 'Date',
            'booking_time': 'Time',
        }
