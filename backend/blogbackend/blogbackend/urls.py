from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/', include('blogapp.urls')), 
    path('api/', include('...')),  
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)