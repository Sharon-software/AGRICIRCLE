from django.db import models

# Create your models here.



class Post(models.Model):
    caption = models.TextField()
    cities = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.caption[:50]


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/')

    def __str__(self):
        return f"Image for Post {self.post.id}"
