# Lochops Backend

A Django REST Framework backend for the Lochops hospital navigation system, integrated with a PostgreSQL/PostGIS database.

## Prerequisites

- Python 3.8+
- PostgreSQL 14+ with PostGIS 3+
- GDAL/GEOS libraries (usually installed with PostGIS or system packages)

## Setup

1.  **Clone the repository** (if not already done).

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the `lochops_backend` directory (next to `settings.py`) or in the root. Use `.env.example` as a template.
    ```bash
    cp .env.example .env
    ```
    Update the `DATABASE_URL` in `.env` to match your local configuration:
    ```
    DATABASE_URL=postgis://your_user:your_password@localhost:5432/lochops_db
    ```

4.  **Database Setup**:
    Ensure your PostgreSQL database exists and has the `lochops` schema with tables created (using the SQL scripts provided previously).
    
    Since the models are `managed = False`, you do **NOT** need to run `makemigrations` or `migrate` for the core app. However, you need to run migrate for Django's internal apps (admin, auth, etc.):
    ```bash
    python manage.py migrate
    ```

5.  **Create Superuser**:
    ```bash
    python manage.py createsuperuser
    ```

6.  **Run Server**:
    ```bash
    python manage.py runserver
    ```

## API Endpoints

Access the API at `http://localhost:8000/api/`.

- `/api/hospitals/`
- `/api/buildings/`
- `/api/floors/`
- `/api/navnodes/`
- `/api/navedges/`
- `/api/pois/`
- ... and more.

## Running Tests

To run the automated tests (including navigation logic verification):

1.  **Install Test Dependencies**:
    Ensure you have `python3-venv` installed if you are on Linux:
    ```bash
    sudo apt install python3-venv
    ```

2.  **Create Virtual Environment** (Recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3.  **Run Tests**:
    ```bash
    python manage.py test core.tests_navigation
    ```

## Admin Interface

Access the admin interface at `http://localhost:8000/admin/`.
