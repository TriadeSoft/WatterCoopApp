"""
Esquema Pydantic (consumo_schema.py):
Define validaciones de entrada y salida para los datos de consumo.
"""
class ConsumoBase(BaseModel):
    fk_id_conexion: int
    lectura_anterior: int
    lectura_actual: int

class ConsumoCreate(ConsumoBase):
    pass

class ConsumoResponse(ConsumoBase):
    id_consumo: int
    consumo_total: int
    
    class Config:
        from_attributes = True
