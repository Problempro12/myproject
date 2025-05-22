from django.contrib import admin
from django.urls import path
from users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', views.RegisterView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/user/', views.UserView.as_view()),
]