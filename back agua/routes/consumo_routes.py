from fastapi import APIRouter
from controllers.consumo_controller import ConsumoController
from models.consumo import Consumo
from pydantic import BaseModel
from datetime import date

router = APIRouter()
controller = ConsumoController()

class ConsumoCreate(BaseModel):
    fk_id_conexion: int
    ultima_lectura: float
    lectura_actual: float
    mes: date  # El mes de la lectura

@router.get("/consumos/")
def get_all_consumos():
    return controller.get_all()

@router.post("/consumos/")
def create_consumo(consumo: ConsumoCreate):
    consumo_obj = Consumo(**consumo.dict())
    return controller.create(consumo_obj)
