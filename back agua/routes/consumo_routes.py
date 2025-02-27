from fastapi import APIRouter
from controllers.consumo_controller import ConsumoController
from models.consumo import Consumo
from pydantic import BaseModel
from datetime import date

router = APIRouter()
controller = ConsumoController()


@router.get("/consumos/")
def get_all_consumos():
    return controller.get_all()

@router.post("/consumos/")
def create_consumo(consumo: Consumo):
    consumo_obj = Consumo(**consumo.dict())
    return controller.create(consumo_obj)

