from flask import Flask, request, render_template
import reqs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("pages/index.html")

@app.route("/signup")
def signupPage():
    return render_template("pages/signup.html")

@app.route("/signup", methods=["POST"])
def signup():
    print(request.form)
    if request.form["password"] != request.form["confirm_password"]:
        return render_template("pages/signup.html", error="Passwords do not match")

    response = reqs.signup(request.form["email"], request.form["first_name"], request.form["last_name"], request.form["password"])
    print(response)
    if response != "OK":
        return render_template("pages/signup.html", error="Error")
    else:
        return redirect(url_for("login"), code=302)

@app.route("/login")
def loginPage():
    return render_template("pages/login.html")

@app.route("/login", methods=["POST"])
def login():
    response = reqs.login(request.form['email'], requests.form['password'])
    if response.status != "OK":
        return render_template("pages/login", error=response.error)
    else:
        session["user"] = request.form['email']
        return redirect(url_for("dashboard"))

@app.route("/dashboard")
def dashboard():
    logs = reqs.get_logs(session["user"], 0)
    return render_template("pages/dashboard.html", logs=logs)

if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)

