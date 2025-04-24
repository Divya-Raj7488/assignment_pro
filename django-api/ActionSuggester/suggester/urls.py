from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name="my_home"),
    path('suggetions/', views.suggestions, name="my_suggestions")
]
