from fastapi import APIRouter, Depends
from models.observacion_model import Observacion
from services.observacion_service import ObservacionService
from repositories.observacion_repository import ObservacionRepository

router = APIRouter()
repository = ObservacionRepository()
service = ObservacionService()


@router.post("/observaciones/")
async def agregar_observacion(id_usuario: int, observacion: str):
    return repository.agregar_observacion(id_usuario, observacion)

@router.get("/observaciones/{id_usuario}")
async def obtener_observaciones(id_usuario: int):
    return repository.obtener_observaciones(id_usuario)
