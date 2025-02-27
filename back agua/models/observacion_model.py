from pydantic import BaseModel

class Observacion(BaseModel):
    id_usuario: int
    observacion: str