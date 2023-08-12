from . import views
from django.urls import path

urlpatterns = [
    path("", views.MenuList.as_view(), name="home"),
    path('booking/', views.Order.as_view(), name='booking'),
    path('all_bookings/', views.BookingsList.as_view(), name='all_bookings'),
    path('edit/<slug:pk>/', views.EditBooking.as_view(), name='edit_booking'),
    path('delete/<slug:pk>/', views.DeleteBooking.as_view(), name='del_booking'),
]
