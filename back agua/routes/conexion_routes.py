from fastapi import APIRouter
from controllers.conexion_controller import ConexionController

router = APIRouter(prefix="/conexiones", tags=["Conexiones"])
controller = ConexionController()  

@router.post("/")
def crear_conexion(direccion_conexion: str, estado: str, id_usuario: int, id_medidor: str):
    return controller.crear_conexion(direccion_conexion, estado, id_usuario, id_medidor)

@router.get("/")
def obtener_conexiones():
    return controller.obtener_conexiones()

@router.get("/{id_conexion}")
def obtener_conexion_por_id(id_conexion: int):
    return controller.obtener_conexion_por_id(id_conexion)
