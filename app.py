from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import session
from datetime import timedelta

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from models import db
from models import User
from models import Prompt

from ai_engine import categorize_prompt
from ai_engine import generate_ai_response

from config import MYSQL_HOST
from config import MYSQL_USER
from config import MYSQL_PASSWORD
from config import MYSQL_DB

app = Flask(__name__)

app.secret_key = "your_secret_key"

app.permanent_session_lifetime = timedelta(days=30)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}"
    f"@{MYSQL_HOST}/{MYSQL_DB}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


# =========================
# HOME
# =========================

@app.route("/")
def home():
    return redirect("/login")


# =========================
# REGISTER
# =========================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        name = request.form["name"]
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:
            return "Email already registered"

        hashed_password = generate_password_hash(password)

        user = User(
            name=name,
            username=username,
            email=email,
            password=hashed_password
        )

        db.session.add(user)
        db.session.commit()

        return redirect("/login")

    return render_template("register.html")


# =========================
# LOGIN
# =========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(
            email=email
        ).first()

        if user and check_password_hash(
            user.password,
            password
        ):

            session.permanent = True

            session["user_id"] = user.id
            session["username"] = user.username

            return redirect("/dashboard")

        return "Invalid Email or Password"

    return render_template("login.html")


# =========================
# DASHBOARD
# =========================

@app.route("/dashboard")
def dashboard():

    if "user_id" not in session:
        return redirect("/login")

    user = User.query.get(
        session["user_id"]
    )

    prompts = Prompt.query.filter_by(
        user_id=session["user_id"]
    ).order_by(
        Prompt.id.desc()
    ).all()

    return render_template(
        "dashboard.html",
        prompts=prompts,
        username=user.username,
        full_name=user.name
    )


# =========================
# GENERATE RESPONSE
# =========================

@app.route("/generate", methods=["POST"])
def generate():

    if "user_id" not in session:
        return redirect("/login")

    prompt_text = request.form["prompt"]

    category = categorize_prompt(
        prompt_text
    )

    ai_response = generate_ai_response(
        prompt_text,
        category
    )

    record = Prompt(
        user_id=session["user_id"],
        prompt_text=prompt_text,
        category=category,
        ai_response=ai_response
    )

    db.session.add(record)
    db.session.commit()

    return redirect("/dashboard")


# =========================
# DELETE CHAT
# =========================

@app.route("/delete_chat/<int:chat_id>")
def delete_chat(chat_id):

    if "user_id" not in session:
        return redirect("/login")

    chat = Prompt.query.get(chat_id)

    if chat:

        db.session.delete(chat)
        db.session.commit()

    return redirect("/dashboard")


# =========================
# PROFILE
# =========================

@app.route("/profile")
def profile():

    if "user_id" not in session:
        return redirect("/login")

    user = User.query.get(
        session["user_id"]
    )

    return render_template(
        "profile.html",
        user=user
    )


# =========================
# LOGOUT
# =========================

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/login")


# =========================
# RUN APP
# =========================

if __name__ == "__main__":
    app.run(debug=True)