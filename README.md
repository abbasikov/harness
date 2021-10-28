# Harness Test

### Overview

This project has two main folders. 'backend' has the django part and 'frontend' has the react part.

### Backend

Follow these steps to run the backend server

- Create a virtual env
- Install the packages from the backend/requirements.txt fil
- While in the backend folder run 'python manage.py makemigrations' from the command line
- After that run 'python manage.py migrate'
- Finall run 'python manage.py runserver'

Note: If you want to access the admin panel follow these steps:

- Run 'python manage.py createsuperuser' and provide the details it asks for
- Go to 'http://127.0.0.1:8000/admin' and add the credentials

### Frontend

Follow these steps to run the frontend server

- While the frontend folder run 'npm install' from the command line
- Run 'npm start'
- Testing the features of the project is very straight forward from that point
