from fastapi import HTTPException
from services.conexion_service import ConexionService

class ConexionController:
    conexion_service = ConexionService()  

    @staticmethod
    def crear_conexion(direccion_conexion, estado, id_usuario, id_medidor):
        return ConexionController.conexion_service.crear_conexion(direccion_conexion, estado, id_usuario, id_medidor)

    @staticmethod
    def obtener_conexiones():
        return ConexionController.conexion_service.obtener_conexiones()

    @staticmethod
    def obtener_conexion_por_id(id_conexion):
        conexion = ConexionController.conexion_service.obtener_conexion_por_id(id_conexion)
        if not conexion:
            raise HTTPException(status_code=404, detail="Conexión no encontrada")
        return conexion

   