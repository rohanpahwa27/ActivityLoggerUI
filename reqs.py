import requests

BACKEND_URL="localhost:3000"

def signup(email, first, last, password):
    params = {"email" : email, "first" : first, "last" : last, "password" : password}
    return requests.post(BACKEND_URL + "/signup", params)

def login(email, password):
    params = {"email" : email, "password" : password}
    return requests.post(BACKEND_URL + "login", params)

def get_logs(user, pagination, searchParams=[]):
    params = {"user" : user, "pagination" : pagination, "searchParams" : searchParams}
    return requests.post(BACKEND_URL + "/logs", params)