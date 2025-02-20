from fastapi import HTTPException
from services.consumo_service import ConsumoService
from models.consumo import Consumo

class ConsumoController:
    def __init__(self):
        self.service = ConsumoService()

    def create(self, consumo: Consumo):
        try:
            return self.service.create(consumo)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_all(self):
        return self.service.get_all()
