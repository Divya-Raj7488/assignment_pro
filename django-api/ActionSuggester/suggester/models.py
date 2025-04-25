from django.db import models
import json


class SuggestionRecord(models.Model):
    query = models.TextField()
    tone = models.CharField(max_length=100)
    intent = models.CharField(max_length=100)
    suggested_actions = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query: {self.query[:50]}..."


# Create your models here.
