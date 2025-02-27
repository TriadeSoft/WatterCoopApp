import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from models.usuario import Usuario  


load_dotenv()

class UsuarioRepository:
    def __init__(self):
        try:
            self.connection = mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                port=int(os.getenv("DB_PORT"))
            )
            self.cursor = self.connection.cursor()
            self.create_database_if_not_exists()
            self.connection.database = os.getenv("DB_NAME")  # Ahora usamos la base de datos específica
            self.create_table_if_not_exists()
        except Error as e:
            print(f"Error de conexión a la base de datos: {e}")
            raise

    def create_database_if_not_exists(self):
        try:
            query = f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}"
            self.cursor.execute(query)
            self.connection.commit()
            print(f"Base de datos '{os.getenv('DB_NAME')}' asegurada.")
        except Error as e:
            print(f"Error al crear la base de datos: {e}")

    def create_table_if_not_exists(self):
        try:
            query = """
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                apellido VARCHAR(100) NOT NULL,
                direccion VARCHAR(100) NOT NULL,
                telefono VARCHAR(15) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                dni VARCHAR(8) NOT NULL UNIQUE
            );
            """
            self.cursor.execute(query)
            self.connection.commit()
            print("Tabla 'usuarios' asegurada.")
        except Error as e:
            print(f"Error al crear la tabla: {e}")
    

    def create(self, usuario):      #Crear usuario
        try:
            query = """
            INSERT INTO usuarios (nombre, apellido, direccion, telefono, email, dni)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            self.cursor.execute(query, (usuario.nombre, usuario.apellido, usuario.direccion, usuario.telefono, usuario.email, usuario.dni.zfill(8)))
            self.connection.commit()
            return True  # Retornar True si la inserción fue exitosa
        except Error as e:
            print(f"Error al crear el usuario: {e}")

    def get_all(self):      #Buscar a todos
        try:
            query = "SELECT * FROM usuarios"
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error al obtener los usuarios: {e}")

    from models.usuario import Usuario

    def get_by_name(self, nombre: str):  # Buscar por nombre
        try:
            query = "SELECT * FROM usuarios WHERE nombre = %s"
            self.cursor.execute(query, (nombre,))
            results = self.cursor.fetchall()  # Obtener todos los resultados
            
            print(f"Resultados obtenidos para {nombre}: {results}")  # 👈 Depuración
            
            if results:
                return [
                    Usuario(
                        id_usuario=row[0],
                        nombre=row[1],
                        apellido=row[2],
                        direccion=row[3],
                        telefono=row[4],
                        email=row[5],
                        dni=str(row[6])
                    ) for row in results
                ]
            
            return None  # Si no se encuentra ningún usuario
        except Error as e:
            print(f"Error al obtener el usuario con Nombre {nombre}: {e}")
            return None

    def get_by_id(self, id_usuario: int):       #Buscar por id
        try:
            query = "SELECT * FROM usuarios WHERE id_usuario = %s"
            self.cursor.execute(query, (id_usuario,))
            result = self.cursor.fetchone()
            if result:
                return Usuario(
                    id_usuario=result[0],
                    nombre=result[1],
                    apellido=result[2],
                    direccion=result[3],
                    telefono=result[4],
                    email=result[5],
                    dni=str(result[6])
                )
            return None  # Si no se encuentra el usuario
        except Error as e:
            print(f"Error al obtener el usuario con ID {id_usuario}: {e}")
            return None
    
    def close(self):
        """Cerrar conexión y cursor"""
        self.cursor.close()
        self.connection.close()
