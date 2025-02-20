import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from models.consumo import Consumo

load_dotenv()

class ConsumoRepository:
    def __init__(self):
        try:
            self.connection = mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                port=int(os.getenv("DB_PORT"))
            )
            self.cursor = self.connection.cursor()
            self.connection.database = os.getenv("DB_NAME")
            self.create_table_if_not_exists()
        except Error as e:
            print(f"Error de conexión a la base de datos: {e}")
            raise

    def create_table_if_not_exists(self):
        try:
            query = """
            CREATE TABLE IF NOT EXISTS consumos (
                id_consumo INT AUTO_INCREMENT PRIMARY KEY,
                fk_id_conexion INT NOT NULL,
                ultima_lectura VARCHAR(50) NOT NULL,
                lectura_actual VARCHAR(50) NOT NULL,
                consumo_total INT GENERATED ALWAYS AS (CAST(lectura_actual AS UNSIGNED) - CAST(ultima_lectura AS UNSIGNED)) STORED,
                mes DATE NOT NULL,
                FOREIGN KEY (fk_id_conexion) REFERENCES conexion(id_conexion) ON DELETE CASCADE);
            """
            self.cursor.execute(query)
            self.connection.commit()
            print("Tabla 'consumos' asegurada.")
        except Error as e:
            print(f"Error al crear la tabla: {e}")

    def create(self, consumo: Consumo):
        try:
            query = """
            INSERT INTO consumos (fk_id_conexion, ultima_lectura, lectura_actual, mes)
            VALUES (%s, %s, %s, %s)
            """
            self.cursor.execute(query, (consumo.fk_id_conexion, consumo.ultima_lectura, consumo.lectura_actual, consumo.mes))
            self.connection.commit()
            return {"message": "Consumo registrado exitosamente."}
        except Error as e:
            print(f"Error al registrar consumo: {e}")

            

    def get_all(self):
        try:
            query = "SELECT * FROM consumos"
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error al obtener consumos: {e}")

    def close(self):
        self.cursor.close()
        self.connection.close()
