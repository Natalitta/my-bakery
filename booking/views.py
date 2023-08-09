from django.shortcuts import render, get_object_or_404
from django.views import generic, View
from .models import MenuItem, Booking
from .forms import BookingForm


class MenuList(generic.ListView):
    model = MenuItem
    queryset = MenuItem.objects.order_by("type")
    template_name = "index.html"


class MenuDetail(View):

    def get(self, request, *args, **kwargs):
        queryset = MenuItem.objects.all
        menu_item = get_object_or_404(queryset, title=title)

        return render(
            request,
            "menu_detail.html",
            {
                "menu_item": menu_item,
                "booking_form": BookingForm()
            },
        )
