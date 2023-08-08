from django.shortcuts import render
from django.views import generic
from .models import MenuItem


class MenuList(generic.ListView):
    model = MenuItem
    queryset = MenuItem.objects.order_by("type")
    template_name = "index.html"
