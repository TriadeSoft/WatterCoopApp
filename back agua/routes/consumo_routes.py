"""
Rutas (consumo_routes.py):
Define los endpoints en FastAPI.
Se crean endpoints para GET y POST.
"""
from fastapi import APIRouter, Depends
from controllers.consumo_controller import agregar_consumo, listar_todos_los_consumos
from consumo_schema import ConsumoCreate, ConsumoResponse
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/consumo", tags=["Consumo"])

@router.post("/", response_model=ConsumoResponse)
def create_consumo(consumo: ConsumoCreate, db: Session = Depends(get_db)):
    """
    Endpoint para registrar un nuevo consumo de agua.
    """
    return agregar_consumo(db, consumo)

@router.get("/", response_model=list[ConsumoResponse])
def get_consumos(db: Session = Depends(get_db)):
    """
    Endpoint para obtener todos los registros de consumo.
    """
    return listar_todos_los_consumos(db)
