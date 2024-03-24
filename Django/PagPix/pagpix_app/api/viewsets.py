from rest_framework import viewsets
from pagpix_app.api import serializers
from pagpix_app import models

class PagpixViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.pagpixSerializer
    queryset = models.Pix.objects.all()
    