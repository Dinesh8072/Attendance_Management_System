from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('attendance/', attendance_list_view),
    path('dashboard/', dashboard_view),
    path('login-history/', user_login_history),
]

