from repositories.conexion_repository import ConexionRepository

class ConexionService:
    @staticmethod
    def crear_conexion(direccion_conexion, estado, id_usuario, id_medidor):
        db = ConexionRepository()
        db.crear_conexion(direccion_conexion, estado, id_usuario, id_medidor)
        db.close()

    @staticmethod
    def obtener_conexiones():
        db = ConexionRepository()
        conexiones = db.obtener_conexiones()  
        db.close()
        return conexiones
        
    @staticmethod
    def obtener_conexion_por_id(id_conexion):  
        db = ConexionRepository()
        conexion = db.obtener_por_id(id_conexion)  
        db.close()
        return conexion

