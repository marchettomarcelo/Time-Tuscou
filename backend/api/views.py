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


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def upload_transactions_info(request):

    print("Bom dia")

    if request.method == 'POST':

        description = request.data.get('description')
        amount = request.data.get('amount')
        date = request.data.get('date')
        category = request.data.get('category')

        user_id = request.user.id
        user = User.objects.get(id=user_id)

        category = Category.objects.create(name=category)
        category.save()

        new_transaction = Transaction.objects.create(
            user=user, description=description, amount=amount, date=date, category=category)
        new_transaction.save()
        # 201 status code means created
        return Response({'response': 'success'}, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        transactions = Transaction.objects.filter(user=user)
        data = []
        for transaction in transactions:
            data.append({
                'id': transaction.id,
                'description': transaction.description,
                'amount': transaction.amount,
                'date': transaction.date,
                'category': transaction.category.name
            })
        return Response({'response': data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_transactions_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
    document = Document.objects.create(
        doc_file=file, document_date=datetime.now())
    document.save()
    # TODO: ORC - read file and create transactions
    
    context = orc(document.doc_file.path)
    transaction = Transaction.objects.create(
        description=context['transactions']['descricao'], amount=context['transactions']['valor'], date=context['transactions']['data'], category=context['transactions']['category'])
    transaction.save()
    bank = Bank_Account.objects.create(
        bank_name=context['bank']['bank_name'],bank_code=context['bank']['bank_code'], account_number=context['account']['account_number'],acount_name=context['account']['account_name'])
    bank.save()
    data = []
    data.append({
        'id': transaction.id,
        'description': context['transactions']['descricao'],
        'amount': context['transactions']['valor'],
        'date': context['transactions']['data'],
        'category': context['transactions']['category']
    })


    return Response({'response': data}, status=status.HTTP_200_OK)
