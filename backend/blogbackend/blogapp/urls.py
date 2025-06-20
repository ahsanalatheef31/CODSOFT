from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentListCreateView, LikeToggleView,FrontendAppView,index

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('', index), 
    path('', include(router.urls)),
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comments'),
    path('like/<int:post_id>/', LikeToggleView.as_view(), name='like-toggle'),
    path('', FrontendAppView.as_view(), name='home'),
    
]

