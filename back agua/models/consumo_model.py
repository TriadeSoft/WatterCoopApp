"""
Modelo (consumo_model.py): Define la estructura de la tabla en SQLAlchemy.
Incluye un esquema ORM para mapear la tabla 'consumo' en la base de datos.
"""

from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Session
from database import Base, get_db
from pydantic import BaseModel
from fastapi import Depends

class Consumo(Base):
    __tablename__ = "consumo"
    
    # Identificador único para cada registro de consumo
    id_consumo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Clave foránea que referencia una conexión de agua
    fk_id_conexion = Column(Integer, ForeignKey("conexion.id_conexion"), nullable=False)
    
    # Medición anterior del consumo
    lectura_anterior = Column(Integer, nullable=False)
    
    # Medición actual del consumo
    lectura_actual = Column(Integer, nullable=False)
    
    # Diferencia entre lectura_actual y lectura_anterior
    consumo_total = Column(Integer, nullable=False)
    
    # Relación con la tabla de conexiones
    conexion = relationship("Conexion", back_populates="consumos")
    
    def calcular_consumo_total(self):
        """
        Método para calcular el consumo total automáticamente.
        """
        self.consumo_total = self.lectura_actual - self.lectura_anterior