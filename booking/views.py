from django.shortcuts import render, get_object_or_404
from django.views import generic, View
from django.views.generic import ListView, CreateView, UpdateView, DeleteView 
from .models import MenuItem, Booking
from .forms import BookingForm
from datetime import timedelta, date
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib import messages


class MenuList(generic.ListView):
    model = MenuItem
    queryset = MenuItem.objects.order_by("title")
    template_name = "index.html"


class Order(LoginRequiredMixin, CreateView):

    form_class = BookingForm
    template_name = 'booking.html'
    success_url = 'all_bookings'
    model = Booking
    
    def form_valid(self, form):
        return super(Order, self).form_valid(form)


class BookingsList(LoginRequiredMixin, ListView):
    model = Booking
    template_name = 'all_bookings.html'

    def get_queryset(self):
        return Booking.objects.filter(
                customer=self.request.user,
                booking_date__gt=(date.today()-timedelta(days=1))
            )


class EditBooking(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    form_class = BookingForm
    template_name = 'edit_booking.html'
    success_url = "all_bookings"
    model = Booking

    def form_valid(self, form):
        messages.success(
            self.request,
            f'You have successfully updated your order.'
        )
        return super(EditBooking, self).form_valid(form)


class DeleteBooking(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Booking
    template_name = 'confirm_delete.html'
    success_url = "all_bookings"

    def form_valid(self, form):
        messages.success(
            self.request,
            'You have successfully deleted your order'
        )
        return super(DeleteBooking, self).form_valid(form)
