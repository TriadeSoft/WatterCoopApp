from fastapi import HTTPException
from services.usuario_service import UsuarioService
from models.usuario import Usuario

class UsuarioController:
    def __init__(self):
        self.service = UsuarioService()

    def create(self, usuario: Usuario):     #Crear usuario
        try:
            return self.service.create(usuario)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_all(self):      #Buscar a todos
        return self.service.get_all()

    def get_by_name(self, nombre: str):       #Buscar por nombre
        return self.service.get_by_name(nombre)
    
    def get_by_id(self, id_usuario: int):       #Buscar por id
        return self.service.get_by_id(id_usuario)




    

