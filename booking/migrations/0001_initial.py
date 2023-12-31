# Generated by Django 3.2.20 on 2023-08-03 19:21

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('type', models.CharField(choices=[('cakes', 'Cakes'), ('pastry', 'Pastry')], default='cakes', max_length=10)),
                ('description', models.TextField(default='')),
                ('featured_image', cloudinary.models.CloudinaryField(default='placeholder', max_length=255, verbose_name='image')),
                ('price', models.FloatField(default=0.0)),
                ('vegan', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['type', 'name'],
            },
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
                ('cakes', models.ManyToManyField(related_name='cakes', to='booking.MenuItem')),
                ('pastry', models.ManyToManyField(related_name='pastry', to='booking.MenuItem')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]
