import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from mysql.connector import connect

load_dotenv()

class ObservacionRepository:
    def __init__(self):

        try:
            self.connection = connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME"),
                port=int(os.getenv("DB_PORT")),
            )
            self.cursor = self.connection.cursor()
            self.create_table_if_not_exists()
        except Error as e:
            print(f"Error de conexión a la base de datos: {e}")
            raise

    def create_table_if_not_exists(self):
        try:
            query = """
            CREATE TABLE IF NOT EXISTS observaciones (
                id_observacion INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT NOT NULL,
                observacion TEXT NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
            );
            """
            self.cursor.execute(query)
            self.connection.commit()
            print("Tabla 'observaciones' asegurada.")
        except Error as e:
            print(f"Error al crear la tabla 'observaciones': {e}")

    def agregar_observacion(self, id_usuario: int, observacion: str):
        try:
            query = """
            INSERT INTO observaciones (id_usuario, observacion) VALUES (%s, %s)"""
            self.cursor.execute(query, (id_usuario, observacion))
            self.connection.commit()
            return {"message": "Observación agregada exitosamente."}
        except Error as e:
            print(f"Error al agregar observación: {e}")
            return {"error": "No se pudo agregar la observación."}



    def obtener_observaciones(self, id_usuario):
        try:
            query = "SELECT id_observacion, observacion FROM observaciones WHERE id_usuario = %s"
            self.cursor.execute(query, (id_usuario,))
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error al obtener observaciones: {e}")
            return []



    def close(self):
        self.cursor.close()
        self.connection.close()