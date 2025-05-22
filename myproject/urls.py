from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'cart/items', views.CartItemView, basename='cartitem')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/cart/', views.CartView.as_view({'get': 'retrieve'})),
    path('api/register', views.RegisterView.as_view()),
    path('api/login/', views.LoginView.as_view()),
    path('api/user/', views.UserView.as_view()),
]