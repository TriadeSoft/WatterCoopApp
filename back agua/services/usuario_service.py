from repositories.usuario_repository import UsuarioRepository
from models.usuario import Usuario
from fastapi import HTTPException

class UsuarioService:
    def __init__(self):
        self.repository = UsuarioRepository()

    def create(self, usuario: Usuario):  # Crear usuario
        success = self.repository.create(usuario)
        if success:
            return {"message": "Usuario creado exitosamente."}
        else:
            raise HTTPException(status_code=400, detail="No se pudo crear el usuario. Verifique los datos proporcionados.")

    def get_all(self):  # Buscar a todos
        return self.repository.get_all()

    def get_by_name(self, nombre: str):
        usuario = self.repository.get_by_name(nombre)  # Busca por nombre
        if not usuario:
            raise HTTPException(status_code=404, detail=f"Usuario con nombre {nombre} no encontrado.")
        return usuario
    
    def get_by_id(self, id_usuario: int):       #Buscar por id
        result = self.repository.get_by_id(id_usuario)
        if result:
            return result
        raise Exception(f"Usuario con id {id_usuario} no encontrado.")




