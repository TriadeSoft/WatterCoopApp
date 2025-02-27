from repositories.consumo_repository import ConsumoRepository
from models.consumo import Consumo

class ConsumoService:
    def __init__(self):
        self.repository = ConsumoRepository()

    def create(self, consumo: Consumo):
        return self.repository.create(consumo)

    def get_all(self):
        return self.repository.get_all()
