from fastapi import APIRouter
from controllers.usuario_controller import UsuarioController
from models.usuario import Usuario
from fastapi import Depends

router = APIRouter()
controller = UsuarioController()



@router.get("/")    #Mensaje predeterminado
async def read_root():
    return {"message": "Aqui viene lo bueno, jovenes 😘 "}

@router.post("/usuarios/")      #Crear usuario
def create_usuario(usuario: Usuario):
    usuario_obj = Usuario(**usuario.dict())

    return controller.create(usuario_obj)

@router.get("/usuarios/")   #Ver todos los usuarios (listas completas)
def get_all_usuarios():
    return controller.get_all()

@router.get("/usuarios/{parametro}")    #el buscador admite nombre o ID
def get_usuario(parametro: str):
    if parametro.isdigit():  # Si el parámetro es un número, buscar por ID
        return controller.get_by_id(int(parametro))
    return controller.get_by_name(parametro)  # Si no, buscar por nombre

@router.get("/usuarios/{nombre}/direccion")     #Buscar direccion
def get_usuario_direccion(nombre: str):
    usuario = controller.get_by_name(nombre)
    if usuario:
        return {"direcciones": [usuario.direccion for usuario in usuario]}  # 🛠️ Lista de direcciones
    return {"error": "Usuario no encontrado"}, 404


    
