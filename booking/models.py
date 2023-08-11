from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


class MenuItem(models.Model):
    # Model for menu items
    title = models.CharField(max_length=30, unique=True)
    description = models.TextField(default="")
    featured_image = CloudinaryField('image', default='placeholder')
    price = models.FloatField(default=0.00)
    vegan = models.BooleanField(default=False)

    class Meta:
        # Order by name
        ordering = ['title']

    def __str__(self):
        return str(self.title)


class Menu(models.Model):
    # Model to create a menu
    title = models.CharField(max_length=25, unique=True)
    cakes = models.ManyToManyField('MenuItem', related_name='cakes')
    pastry = models.ManyToManyField('MenuItem', related_name='pastry')

    class Meta:
        # Order by name
        ordering = ['title']

    def __str__(self):
        return str(self.title)


# Choice fields
BOOKING_TIME = ((1, "morning"), (2, "afternoon"), (3, "evening"))


class Booking(models.Model):

    # Model for making bookings of menu items
    customer = models.ForeignKey(User, on_delete=models.CASCADE,
        related_name="booking_customer")
    booking_name = models.CharField(max_length=25)
    booked_item = models.ForeignKey(MenuItem,
        on_delete=models.CASCADE, related_name="ordered_item")
    number_of_items = models.IntegerField(default=1)
    booking_date = models.DateField()
    home_delivery = models.BooleanField(default=False)
    address = models.CharField(max_length=100)
    booking_time = models.IntegerField(choices=BOOKING_TIME, default=1)
    completed = models.BooleanField(default=False)

    class Meta:
        # Order by booking_date and booking_time
        ordering = ['booking_date', 'booking_time']

    def __str__(self):
        return str(self.pk)
