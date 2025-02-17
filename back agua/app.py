from fastapi import FastAPI
from routes.usuario_routes import router as usuario_router
from repositories.conexion_repository import ConexionRepository
from routes.conexion_routes import router as conexion_router
from routes.observacion_routes import router as observacion_router  # Importar rutas de observaciones
from repositories.observacion_repository import ObservacionRepository  # Importar repositorio de observaciones


#   uvicorn app:app --reload


app = FastAPI()

# Incluir las rutas
app.include_router(usuario_router)
conexion_repo = ConexionRepository()  # Asegura que se cree la tabla al iniciar
app.include_router(conexion_router)  # <-- Registrar rutas de conexión

observacion_repo = ObservacionRepository()  # Asegurar la creación de la tabla observaciones al iniciar
app.include_router(observacion_router)  # Registrar rutas de observaciones
