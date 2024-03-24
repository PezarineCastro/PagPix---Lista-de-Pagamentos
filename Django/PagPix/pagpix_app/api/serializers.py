from rest_framework  import serializers
from pagpix_app import models


class pagpixSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Pix
        fields = '__all__'
