from click import style
from django.contrib.auth.models import User
from rest_framework import serializers
import base64
from django.core.files.base import ContentFile
from .models import Post, PostImage



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = [ 'email', 'password', 'first_name', 'last_name']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        return user


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']


class PostSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.CharField(), write_only=True
    )
    uploaded_images = PostImageSerializer(source='images', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'caption', 'cities', 'images', 'uploaded_images', 'created_at']

    def create(self, validated_data):
        images_data = validated_data.pop('images')
        post = Post.objects.create(**validated_data)

        for image_data in images_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]

            file = ContentFile(base64.b64decode(imgstr), name=f'post.{ext}')
            PostImage.objects.create(post=post, image=file)

        return post