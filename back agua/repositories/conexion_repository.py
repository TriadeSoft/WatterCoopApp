import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from mysql.connector import connect
import logging

load_dotenv()

# Validar que las variables del .env están cargadas
if not all([os.getenv("DB_HOST"), os.getenv("DB_USER"), os.getenv("DB_PASSWORD"), os.getenv("DB_NAME"), os.getenv("DB_PORT")]):
    raise Exception("Faltan variables en el archivo .env")

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
            logging.error(f"Error de conexión a la base de datos: {e}")
            raise

    def create_table_if_not_exists(self):
        """Crea la tabla si no existe, asegurando que 'usuarios' ya exista."""
        try:
            # Verificar si la tabla 'usuarios' existe antes de crear 'conexion'
            self.cursor.execute("SHOW TABLES LIKE 'usuarios'")
            usuarios_existe = self.cursor.fetchone()

            if not usuarios_existe:
                logging.error("Error: La tabla 'usuarios' no existe. No se puede crear 'conexion'.")
                return

            query = """
            CREATE TABLE IF NOT EXISTS conexion (
                id_conexion INT AUTO_INCREMENT PRIMARY KEY,
                direccion_conexion VARCHAR(255) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                id_usuario INT NOT NULL,
                id_medidor VARCHAR(50) NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
            ) ENGINE=InnoDB;
            """
            self.cursor.execute(query)
            self.connection.commit()
            logging.info("Tabla 'conexion' asegurada.")
        except Error as e:
            logging.error(f"Error al crear la tabla 'conexion': {e}")


    def crear_conexion(self, direccion_conexion, estado, id_usuario, id_medidor):
        """Crea una nueva conexión en la base de datos."""
        try:
            query = """
            INSERT INTO conexion (direccion_conexion, estado, id_usuario, id_medidor)
            VALUES (%s, %s, %s, %s)
            """
            self.cursor.execute(query, (direccion_conexion, estado, int(id_usuario), id_medidor))
            self.connection.commit()
            return {"message": "Conexión creada con éxito"}
        except Error as e:
            logging.error(f"Error al crear la conexión: {e}")
            return {"error": str(e)}

    def obtener_conexiones(self):
        """Obtiene todas las conexiones registradas."""
        try:
            self.cursor.execute("SELECT * FROM conexion")
            return self.cursor.fetchall()
        except Error as e:
            logging.error(f"Error al obtener conexiones: {e}")
            return []

    def obtener_por_id(self, id_conexion):
        """Obtiene una conexión por su ID."""
        try:
            query = "SELECT * FROM conexion WHERE id_conexion = %s"
            self.cursor.execute(query, (int(id_conexion),))
            return self.cursor.fetchone()
        except Error as e:
            logging.error(f"Error al obtener la conexión con ID {id_conexion}: {e}")
            return None

    def close(self):
        """Cierra la conexión a la base de datos de forma segura."""
        try:
            if self.cursor:
                self.cursor.close()
            if self.connection:
                self.connection.close()
        except Error as e:
            logging.error(f"Error al cerrar la conexión: {e}")
