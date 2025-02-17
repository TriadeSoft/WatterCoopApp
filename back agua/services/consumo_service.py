"""
Servicio (consumo_service.py):
Lógica de negocio relacionada con el consumo de agua.
"""
def registrar_consumo(db: Session, consumo: ConsumoCreate):
    return crear_consumo(db, consumo)

def listar_consumos(db: Session):
    """
    Retorna todos los registros de consumo.
    """
    return obtener_consumos(db)
