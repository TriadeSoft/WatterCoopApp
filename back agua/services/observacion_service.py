from repositories.observacion_repository import ObservacionRepository

class ObservacionService:
    def __init__(self):
        self.repository = ObservacionRepository()

    def agregar_observacion(self, id_usuario, observacion):
        return self.repository.agregar_observacion(id_usuario, observacion)

    def obtener_observaciones(self, id_usuario):
        return self.repository.obtener_observaciones(id_usuario)
    

