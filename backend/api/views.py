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
                {"id": 1, "valor": 100, "data": "2021-01-01",
                    "nome": "teste1", "categoria": "festa", },
                {"id": 2, "valor": 200, "data": "2021-01-01",
                    "nome": "teste2", "categoria": "restaurante", },
                {"id": 3, "valor": 300, "data": "2021-01-01",
                    "nome": "teste3", "categoria": "academia", },
                {"id": 4, "valor": 400, "data": "2021-01-01",
                    "nome": "test4", "categoria": "outros", },
            ]
        }

        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
