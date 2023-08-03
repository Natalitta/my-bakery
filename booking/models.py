from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Choice fields
ITEM_TYPES = (
    ("cakes", "Cakes"),
    ("pastry", "Pastry"),
)


class MenuItem(models.Model):
    # Model for menu items
    name = models.CharField(max_length=30, unique=True)
    type = models.CharField(max_length=10, choices=ITEM_TYPES, default='cakes')
    description = models.TextField(default="")
    featured_image = CloudinaryField('image', default='placeholder')
    price = models.FloatField(default=0.00)
    vegan = models.BooleanField(default=False)

    class Meta:
        # Order by type and name
        ordering = ['type', 'name']

    def __str__(self):
        return str(self.name)


class Menu(models.Model):
    # Model to create a menu
    name = models.CharField(max_length=25, unique=True)
    cakes = models.ManyToManyField('MenuItem', related_name='cakes')
    pastry = models.ManyToManyField('MenuItem', related_name='pastry')

    class Meta:
        # Order by name
        ordering = ['name']

    def __str__(self):
        return str(self.name)
