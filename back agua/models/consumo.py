from datetime import date
from pydantic import BaseModel, computed_field

class Consumo(BaseModel):
    fk_id_conexion: int
    ultima_lectura: str  # Mantiene los ceros a la izquierda
    lectura_actual: str  # Mantiene los ceros a la izquierda
    mes: str  # "2025-02"

    @property  

    def consumo_total(self) -> int:
        """Calcula la diferencia de lecturas."""
        return int(self.lectura_actual) - int(self.ultima_lectura)
