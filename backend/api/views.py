from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import *
from datetime import datetime
from .orc_tools import *

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':

        data = {
            "nome": "Marcelo",
            "meses": ["JAN2022", "FEV2022", "MAR2022", "ABR2022"],
            "transacoes": [
                {"id": 1, "amount": 100, "date": "2021-01-01",
                    "description": "teste1", "category": "festa", },
                {"id": 2, "amount": 200, "date": "2021-01-01",
                    "description": "teste2", "category": "restaurante", },
                {"id": 3, "amount": 300, "date": "2021-01-01",
                    "description": "teste3", "category": "academia", },
                {"id": 4, "amount": 400, "date": "2021-01-01",
                    "description": "test4", "category": "outros", },
            ]
        }

        return Response({'response': data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_transactions_info(request):
    if request.method == 'POST':
        description = request.POST.get('description')
        amount = request.POST.get('value')
        date = request.POST.get('date')
        category = request.POST.get('category')
    transaction = Transaction.objects.create(description=description, amount=amount, date=date, category=category)
    transaction.save()
    return Response({'response': 'success'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_transactions_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
    document = Document.objects.create(doc_file=file, document_date=datetime.now())
    document.save()
    # TODO: ORC - read file and create transactions
    '''
    context = orc(document.doc_file.path)
    transaction = Transaction.objects.create(description='teste', amount=100, date=datetime.now(), category='teste')
    '''
    return Response({'response': 'ok'}, status=status.HTTP_200_OK)