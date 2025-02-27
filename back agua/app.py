from fastapi import FastAPI
from routes.usuario_routes import router as usuario_router
from repositories.conexion_repository import ConexionRepository
from routes.conexion_routes import router as conexion_router
from routes.observacion_routes import router as observacion_router  # Importar rutas de observaciones
from repositories.observacion_repository import ObservacionRepository  # Importar repositorio de observaciones
from routes.consumo_routes import router as consumo_router
from repositories.consumo_repository import ConsumoRepository
import logging


# Configurar logging
logging.basicConfig(level=logging.INFO)

#   uvicorn app:app --reload


# Asegurar creación de tablas en orden correcto
conexion_repo = ConexionRepository()  # Debe ejecutarse primero
consumo_repo = ConsumoRepository()    # Ahora se creará después

app = FastAPI()


# Routers organizados por categorías
app.include_router(usuario_router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(observacion_router, prefix="/observaciones", tags=["Observaciones"])
app.include_router(conexion_router, prefix="/conexiones", tags=["Conexiones"])
app.include_router(consumo_router, prefix="/consumo", tags=["Consumo"])


