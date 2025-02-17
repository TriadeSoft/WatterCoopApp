from fastapi import APIRouter
from controllers.usuario_controller import UsuarioController
from models.usuario import Usuario
from pydantic import BaseModel
from fastapi import Depends

router = APIRouter()
controller = UsuarioController()

class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    direccion: str
    telefono: str
    email: str
    dni: str


@router.get("/")    #Mensaje predeterminado
async def read_root():
    return {"message": "Aqui viene lo bueno, jovenes 😘 "}

@router.get("/usuarios/")   #Ver todos los usuarios (listas completas)
def get_all_usuarios():
    return controller.get_all()

@router.get("/usuarios/{id_usuario}")   #Buscar usuario individualmente
def get_usuario(id_usuario: int):
    return controller.get_by_id(id_usuario)

@router.post("/usuarios/")      #Crear usuario
def create_usuario(usuario: UsuarioCreate):
    usuario_obj = Usuario(**usuario.dict())

    return controller.create(usuario_obj)


@router.get("/usuarios/{id_usuario}/direccion")     #Buscar direccion
def get_usuario_direccion(id_usuario: int):
    usuario = controller.get_by_id(id_usuario)
    if usuario:
        return {"direccion": usuario.direccion}
    return {"error": "Usuario no encontrado"}
