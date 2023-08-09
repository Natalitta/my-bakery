from . import views
from django.urls import path

urlpatterns = [
    path("", views.MenuList.as_view(), name="home"),
    # path('booking/', views.OrderView.as_view(), name='booking'),
]
