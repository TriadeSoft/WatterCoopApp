import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from mysql.connector import connect


load_dotenv()

class ConexionRepository:
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
            CREATE TABLE IF NOT EXISTS conexion (
                id_conexion INT AUTO_INCREMENT PRIMARY KEY,
                direccion_conexion VARCHAR(255) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                id_usuario INT NOT NULL,
                id_medidor VARCHAR(50) NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
            );
            """
            self.cursor.execute(query)
            self.connection.commit()
            print("Tabla 'conexion' asegurada.")
        except Error as e:
            print(f"Error al crear la tabla 'conexion': {e}")

    def crear_conexion(self, direccion_conexion, estado, id_usuario, id_medidor):
        try:
            query = """
            INSERT INTO conexion (direccion_conexion, estado, id_usuario, id_medidor)
            VALUES (%s, %s, %s, %s)
            """
            self.cursor.execute(query, (direccion_conexion, estado, id_usuario, id_medidor))
            self.connection.commit()
            return {"message": "Conexión creada con éxito"}
        except Error as e:
            print(f"Error al crear la conexión: {e}")
            return {"error": str(e)}

    def obtener_conexiones(self):  
        try:
            self.cursor.execute("SELECT * FROM conexion")
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error al obtener conexiones: {e}")

    def obtener_por_id(self, id_conexion):
        try:
            self.cursor.execute("SELECT * FROM conexion WHERE id_conexion = %s", (id_conexion,))
            return self.cursor.fetchone()
        except Error as e:
            print(f"Error al obtener la conexión con ID {id_conexion}: {e}")

    def close(self):
        self.cursor.close()
        self.connection.close()
