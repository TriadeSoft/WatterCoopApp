import os
from dotenv import load_dotenv

load_dotenv()

# Imprimir para verificar si la variable DB_NAME se está cargando
print("DB Name:", os.getenv("DB_NAME"))
