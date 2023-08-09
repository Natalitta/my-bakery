from django.shortcuts import render
from django.views import generic
from .models import MenuItem, Booking
from .forms import BookingForm


class MenuList(generic.ListView):
    model = MenuItem
    queryset = MenuItem.objects.order_by("type")
    template_name = "index.html"


class MenuItemDetail(View):

    def get(self, request, slug, *args, **kwargs):
        queryset = MenuItem.objects.filter(status=1)
        menu_item = get_object_or_404(queryset)

        return render(
            request,
            "menu_detail.html",
            {
                "menu_item": menu-item,
                "booking_form": BookingForm()
            },
        )
