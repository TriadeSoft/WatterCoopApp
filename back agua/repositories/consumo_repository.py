"""
Repositorio (consumo_repository.py):
Define los métodos para acceder a la base de datos.
"""
def crear_consumo(db: Session, consumo: ConsumoCreate):
    nuevo_consumo = Consumo(
        fk_id_conexion=consumo.fk_id_conexion,
        lectura_anterior=consumo.lectura_anterior,
        lectura_actual=consumo.lectura_actual
    )
    nuevo_consumo.calcular_consumo_total()
    db.add(nuevo_consumo)
    db.commit()
    db.refresh(nuevo_consumo)
    return nuevo_consumo

def obtener_consumos(db: Session):
    """
    Obtiene todos los registros de consumo de la base de datos.
    """
    return db.query(Consumo).all()