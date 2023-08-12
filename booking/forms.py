from .models import Booking
from django import forms

class DateInput(forms.DateInput):
        input_type = 'date'


class BookingForm(forms.ModelForm):
    
    class Meta:
        model = Booking
        fields = ('booked_item', 'booking_name', 'number_of_items',
                  'booking_date', 'booking_time', 'home_delivery', 'address')
        labels = {
            'booked_item': 'Cake',
            'booking_name': 'Your Name',
            'number_of_items': 'Number of cakes',
            'booking_date': 'Date',
            'booking_time': 'Time',
            'home_delivery': 'Delivery 10 &euro;'
        }
        widgets = {
            'booking_date': DateInput(),
        }
