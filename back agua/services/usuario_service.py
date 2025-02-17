from repositories.usuario_repository import UsuarioRepository
from models.usuario import Usuario

class UsuarioService:
    def __init__(self):
        self.repository = UsuarioRepository()

    def create(self, usuario: Usuario):     #Crear usuario
        self.repository.create(usuario)
        return {"message": "Usuario creado exitosamente."}

    def get_all(self):      #Buscar a todos
        return self.repository.get_all()

    def get_by_id(self, id_usuario: int):       #Buscar por id
        result = self.repository.get_by_id(id_usuario)
        if result:
            return result
        raise Exception(f"Usuario con id {id_usuario} no encontrado.")




