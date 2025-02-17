"""
Controlador (consumo_controller.py):
Funciones para manejar solicitudes relacionadas con el consumo de agua.
"""
def agregar_consumo(db: Session, consumo: ConsumoCreate):
    return registrar_consumo(db, consumo)

def listar_todos_los_consumos(db: Session):
    """
    Controlador para obtener todos los consumos registrados.
    """
    return listar_consumos(db)