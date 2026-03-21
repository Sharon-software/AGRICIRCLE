from django.urls import path
from accounts import views as UserViews
from accounts.views import PostView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),

    #removed api beacause i already i already have on urls
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected-view/', UserViews.ProtectedView.as_view()),
    path('posts/', PostView.as_view(), name='post'),
]