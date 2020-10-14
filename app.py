app = Flask(__name__)

@app.route("/")
def home():
    return render_template("pages/index.html")

@app.route("signup")
def signupPage():
    return render_template("pages/signup")

@app.route("signup")
def signup():
    response = reqs.signup(request.form["email"], request.form["first"], request.form["last"], reequest.form["password"])
    if response.code != "OK":
        return render_template("pages/signup", error=response.error)
    else:
        return redirect(url_for("login"), code=302)

@app.route("/login")
def loginPage():
    return render_template("pages/login")

@app.route("/login", methods=["POST"])
def login():
    response = reqs.login(request.form['email'], requests.form['password'])
    if response.status != "OK":
        return render_template("pages/login", error=response.error)
    else:
        session["user"] = request.form['email']
        return redirect(url_for("dashboard"))

@app.route("dashboard")
def dashboard():
    logs = reqs.get_logs(session["user"], 0)
    return render_template("pages/logs", logs=logs)
