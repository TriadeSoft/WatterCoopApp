from pydantic import BaseModel

class Usuario(BaseModel):
    nombre: str
    apellido: str
    direccion: str
    telefono: str
    email: str
    dni: str
