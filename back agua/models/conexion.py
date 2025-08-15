from pydantic import BaseModel
from typing import Literal

class Conexion(BaseModel):
    direccion_conexion: str
    estado: Literal["ACTIVO", "INACTIVO"]
    id_usuario: int
    id_medidor: str
