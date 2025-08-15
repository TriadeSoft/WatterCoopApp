from pydantic import BaseModel, EmailStr, Field

class Usuario(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=100)
    apellido: str = Field(..., min_length=2, max_length=100)
    direccion: str = Field(..., min_length=5, max_length=150)
    telefono: str = Field(..., min_length=7, max_length=10)
    email: EmailStr
    dni: str = Field(..., pattern=r"^\d{7,8}$")    # Solo permite 7 u 8 dígitos numéricos
