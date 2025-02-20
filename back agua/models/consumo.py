from pydantic import BaseModel


class Consumo(BaseModel):
    fk_id_conexion: int
    ultima_lectura: str  # Mantiene los ceros a la izquierda
    lectura_actual: str  # Mantiene los ceros a la izquierda
    mes: str  # "2024-02"

    @property
    def consumo_total(self) -> int:
        """Resta las lecturas y devuelve un número entero."""
        return int(self.lectura_actual) - int(self.ultima_lectura)
