# Personal Portfolio Website — Django
### ITS 305-A · Midterm Project

A dynamic personal portfolio website built with **Django**, featuring a full admin panel, contact form, and clean responsive design. Deployed on **PythonAnywhere**.

---

## 🌐 Live URL
```
https://firstname_lastname.pythonanywhere.com
```
*(Replace with your actual PythonAnywhere username)*

## 📁 GitHub Repository
```
https://github.com/yourusername/portfolio
```

---

## ✨ Features

- **Home** — Name, tagline, profile photo, and featured projects preview
- **About** — Personal background and career goals
- **Skills** — Categorized skills with animated proficiency bars
- **Projects** — Cards with title, description, tech stack, GitHub & live links
- **Education** — Timeline view of academic background
- **Contact** — Contact form that saves messages to the database
- **Django Admin** — Full content management for all sections

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python 3.10+ | Backend language |
| Django 4.2 | Web framework |
| SQLite | Local development database |
| MySQL | Production database (PythonAnywhere) |
| HTML / CSS | Frontend structure and styling |
| JavaScript | Skill bar animations, mobile nav |
| Pillow | Image handling |
| GitHub | Version control |
| PythonAnywhere | Hosting & deployment |

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Create and Activate a Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
> Note: If you don't need MySQL locally, you can skip `mysqlclient`.  
> SQLite is used by default for local development.

### 4. Apply Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Load Sample Data (Optional)
```bash
python manage.py loaddata portfolio/fixtures/sample_data.json
```

### 6. Create a Superuser (Admin Account)
```bash
python manage.py createsuperuser
```

### 7. Run the Development Server
```bash
python manage.py runserver
```

Visit: `http://127.0.0.1:8000`  
Admin: `http://127.0.0.1:8000/admin`

---

## 📂 Project Structure

```
portfolio_project/
├── manage.py
├── requirements.txt
├── README.md
│
├── portfolio_site/          # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── portfolio/               # Main Django app
    ├── models.py            # Profile, Skill, Project, Education, ContactMessage
    ├── views.py             # All page views
    ├── urls.py              # URL routing
    ├── admin.py             # Admin panel setup
    ├── apps.py
    ├── fixtures/
    │   └── sample_data.json
    ├── templatetags/
    │   └── portfolio_tags.py
    ├── templates/
    │   └── portfolio/
    │       ├── base.html
    │       ├── home.html
    │       ├── about.html
    │       ├── skills.html
    │       ├── projects.html
    │       ├── education.html
    │       └── contact.html
    └── static/
        └── portfolio/
            ├── css/style.css
            └── js/main.js
```

---

## 🚀 Deployment on PythonAnywhere

### Step 1 — Create a PythonAnywhere Account
- Go to [pythonanywhere.com](https://www.pythonanywhere.com)
- Register using the format: `firstname_lastname`

### Step 2 — Open a Bash Console
From the PythonAnywhere dashboard, open a **Bash** console.

### Step 3 — Clone Your Repository
```bash
git clone https://github.com/yourusername/portfolio.git ~/portfolio
```

### Step 4 — Create a Virtual Environment
```bash
mkvirtualenv --python=python3.10 portfolio-env
pip install -r ~/portfolio/requirements.txt
```

### Step 5 — Configure settings.py for Production
Edit `portfolio_site/settings.py`:
```python
DEBUG = False
ALLOWED_HOSTS = ['firstname_lastname.pythonanywhere.com']

# Use MySQL (from PythonAnywhere dashboard > Databases tab)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'firstname_lastname$portfolio',
        'USER': 'firstname_lastname',
        'PASSWORD': 'your-mysql-password',
        'HOST': 'firstname_lastname.mysql.pythonanywhere-services.com',
    }
}

STATIC_ROOT = '/home/firstname_lastname/portfolio/staticfiles'
```

### Step 6 — Run Migrations & Collect Static Files
```bash
cd ~/portfolio
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
python manage.py loaddata portfolio/fixtures/sample_data.json
```

### Step 7 — Configure the Web App
1. Go to **Web** tab → Add new web app
2. Choose **Manual configuration** → Python 3.10
3. Set **Source code**: `/home/firstname_lastname/portfolio`
4. Set **Working directory**: `/home/firstname_lastname/portfolio`
5. Set **Virtualenv**: `/home/firstname_lastname/.virtualenvs/portfolio-env`

### Step 8 — Edit the WSGI File
Click the WSGI configuration file link and replace its content with:
```python
import os
import sys

path = '/home/firstname_lastname/portfolio'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio_site.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### Step 9 — Set Up Static Files
In the **Web** tab → Static files:
| URL | Directory |
|---|---|
| `/static/` | `/home/firstname_lastname/portfolio/staticfiles` |
| `/media/` | `/home/firstname_lastname/portfolio/media` |

### Step 10 — Reload & Launch 🎉
Click **Reload** on the Web tab.  
Visit: `https://firstname_lastname.pythonanywhere.com`

---

## 🔑 Admin Panel Usage

Visit `/admin` and log in to manage all content:

| Model | What to Add |
|---|---|
| **Profile** | Your name, tagline, bio, photo, social links |
| **Skills** | Name, category, proficiency % |
| **Projects** | Title, description, tech stack, GitHub link |
| **Education** | School, degree, field, years |
| **Contact Messages** | View messages sent through the contact form |

---

## 👤 Author

**Your Full Name**  
ITS 305-A · Midterm Project  
[GitHub](https://github.com/yourusername) · [Email](mailto:yourname@email.com)
