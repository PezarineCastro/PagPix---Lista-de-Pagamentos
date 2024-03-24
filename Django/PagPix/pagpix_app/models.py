from datetime import date
from uuid import uuid4
from django.db import models

# Create your models here.
class Pix(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    dataHora = models.DateTimeField(auto_now_add=True)
    nome = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    telefone = models.CharField(max_length=64, null=True, blank=True)
    cpfCNPJ = models.CharField(max_length=64, null=True, blank=True)
    endereco = models.CharField(max_length=255, null=True, blank=True)
    bairro = models.CharField(max_length=64, null=True, blank=True)
    cidade = models.CharField(max_length=64, null=True, blank=True)
    uf = models.CharField(max_length=2, null=True, blank=True)
    cep = models.CharField(max_length=8, null=True, blank=True)
    nrDoc = models.CharField(max_length=64, null=True, blank=True)
    nNum = models.CharField(max_length=20, null=True, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    vencimento = models.DateField(default=date.today)
    desconto1 = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    dataDesconto1 = models.DateField(default=date.today)
    desconto2 = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    dataDesconto2 = models.DateField(default=date.today)
    modoMulta = models.IntegerField(default=0)
    multa = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    modoJuros = models.IntegerField(default=0)
    juros = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    validade = models.IntegerField(default=1)
    info = models.CharField(max_length=255, null=True, blank=True)
    comentarios = models.CharField(max_length=1000, null=True, blank=True)
    callback = models.CharField(max_length=255, null=True, blank=True)
    originId = models.IntegerField(default=4)

