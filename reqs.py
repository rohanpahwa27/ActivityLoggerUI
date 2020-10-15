import requests

BACKEND_URL="http://localhost:8080"

def signup(email, first, last, password):
    params = {"email" : email, "first_name" : first, "last_name" : last, "password" : password}
    return requests.post(BACKEND_URL + "/signup", json=params)

def login(email, password):
    params = {"email" : email, "password" : password}
    return requests.post(BACKEND_URL + "login", json=params)

def get_logs(user, pagination, searchParams=[]):
    params = {"user" : user, "pagination" : pagination, "searchParams" : searchParams}
    return requests.post(BACKEND_URL + "/logs", json=params)