from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.utils.timezone import now
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import User, Attendance
from .serializers import UserSerializer, AttendanceSerializer
from django.db.models import Max
from django.contrib.auth import get_user_model
from rest_framework.response import Response
import json

User=get_user_model()

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"message": "User created"}, status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        attendance = Attendance.objects.create(user=user)
        return JsonResponse({
            "message": "Login successful",
            "user_id": user.id,
            "login_time": str(attendance.login_time)
        }, status=200)
    return JsonResponse({"message": "Invalid credentials"}, status=400)


@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    user_id = request.data.get("user_id")
    try:
        attendance = Attendance.objects.filter(user_id=user_id, logout_time=None).last()
        if attendance:
            attendance.logout_time = now()
            attendance.save()
            return JsonResponse({
                "message": "Logout recorded",
                "logout_time": str(attendance.logout_time)
            }, status=200)
        else:
            return JsonResponse({"message": "No active session found"}, status=400)
    except Attendance.DoesNotExist:
        return JsonResponse({"message": "Attendance not found"}, status=404)


@api_view(['GET'])
def attendance_list_view(request):
    attendances = Attendance.objects.all()
    serializer = AttendanceSerializer(attendances, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
def dashboard_view(request):
    if request.method == 'GET':
        total_users = User.objects.count()
        latest_logins = Attendance.objects.values('user__username').annotate(
            last_login=Max('login_time')
        )
        return JsonResponse({
            "total_users": total_users,
            "latest_logins": list(latest_logins)
        })


@csrf_exempt
def user_login_history(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        user_id = data.get('user_id')

        try:
            user = User.objects.get(id=user_id)
            logins = Attendance.objects.filter(user=user).order_by('-login_time')
            login_data = [
                {
                    'login_time': login.login_time.strftime('%Y-%m-%d %H:%M:%S')
                }
                for login in logins
            ]
            return JsonResponse({'total_logins': len(login_data), 'history': login_data})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
