# Week 3 - Python & REST/JSON Notes

## venv
- Isolated Python environment per project
- Keeps dependencies separate from other projects
- Created with: python -m venv venv
- Activated with: venv\Scripts\activate

## pip
- Python's package manager (like npm for Python)
- pip install <package> to install
- pip freeze > requirements.txt to save exact versions

## Functions & Modules
- def keyword to define a function
- A .py file is a "module"
- from filename import thing to reuse code across files

## REST
- GET -> retrieve data
- POST -> create data
- PUT/PATCH -> update data
- DELETE -> remove data
- Each maps to a URL path ("endpoint")

## JSON
- Data format used to send/receive info between frontend and backend
- FastAPI automatically converts Python dicts to JSON in responses