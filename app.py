from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

class Presupuesto:
    def __init__(self, app):
        self.app = app
        self.app.config['MYSQL_HOST'] = 'localhost'
        self.app.config['MYSQL_USER'] = 'root'
        self.app.config['MYSQL_PASSWORD'] = 'P1ssw4rd'
        self.app.config['MYSQL_DB'] = 'aventurismo'
        self.mysql = MySQL(self.app)

    def agregar(self, destino, actividad, personas):
        cursor = self.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("INSERT INTO aventurismo.cotizacion_viaje (destino, actividad, personas) VALUES (%s, %s, %s)", (destino, actividad, personas))
        self.mysql.connection.commit()

    def modificar(self, id, destino=None, actividad=None, personas=None):
        cursor = self.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        if destino:
            cursor.execute("UPDATE aventurismo.cotizacion_viaje SET destino = %s WHERE id = %s", (destino, id))
        if actividad:
            cursor.execute("UPDATE aventurismo.cotizacion_viaje SET actividad = %s WHERE id = %s", (actividad, id))
        if personas:
            cursor.execute("UPDATE aventurismo.cotizacion_viaje SET personas = %s WHERE id = %s", (personas, id))
        self.mysql.connection.commit()

    def eliminar(self, id):
        cursor = self.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("DELETE FROM aventurismo.cotizacion_viaje WHERE id = %s", (id,))
        self.mysql.connection.commit()

    def consultar(self):
        cursor = self.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM aventurismo.cotizacion_viaje")
        resultados = cursor.fetchall()
        return resultados

presupuesto = Presupuesto(app)

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/inicio_usuario')
def inicio_usuario():
    return render_template('inicio_usuario.html')

@app.route('/agregar', methods=['POST'])
def agregar():
    data = request.get_json()
    destino = data['destino']
    actividad = data['actividad']
    personas = data['personas']
    presupuesto.agregar(destino, actividad, personas)
    return jsonify({"message": "Destino agregado con éxito"})

@app.route('/modificar', methods=['POST'])
def modificar():
    data = request.get_json()
    id = data['id']
    destino = data.get('destino')
    actividad = data.get('actividad')
    personas = data.get('personas')
    presupuesto.modificar(id, destino, actividad, personas)
    return jsonify({"message": "Destino modificado con éxito"})

@app.route('/eliminar', methods=['POST'])
def eliminar():
    data = request.get_json()
    id = data['id']
    presupuesto.eliminar(id)
    return jsonify({"message": "Destino eliminado con éxito"})

@app.route('/consultar', methods=['POST'])
def consultar():
    resultados = presupuesto.consultar()
    return jsonify({"resultados": resultados})

if __name__ == '__main__':
    app.run(debug=True)
