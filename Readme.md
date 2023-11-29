# Estructura de Datos en postgres:
Se creó la base de datos llamada jerarquia 
```bash
-- Database: jerarquia

-- DROP DATABASE IF EXISTS jerarquia;

CREATE DATABASE jerarquia
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```
Se utilizó una tabla employees en la base de datos con la siguiente estructura:

```bash
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  version INTEGER NOT NULL,
  superior_id INTEGER,
  FOREIGN KEY (superior_id) REFERENCES employees(id)
);
```

## Prueba de datos:

```
-- INSERT de prueba
INSERT INTO employees (name, version, superior_id) VALUES ('Alex 1', 1, NULL);
INSERT INTO employees (name, version, superior_id) VALUES ('Pedro 2', 1, 1);
INSERT INTO employees (name, version, superior_id) VALUES ('Juan 3', 1, 1);
INSERT INTO employees (name, version, superior_id) VALUES ('Julian 4', 1, 2);
INSERT INTO employees (name, version, superior_id) VALUES ('Ana 5', 1, 2);
INSERT INTO employees (name, version, superior_id) VALUES ('Sahara 6', 1, 3);
INSERT INTO employees (name, version, superior_id) VALUES ('Maria 7', 1, 3);
```
## BACKEND:
Se crea un backend con express, Typescript, postgres y swagger UI con sus demás componentes para ejecutar el backend.

Descargar proyecto https://github.com/alexanderAngulom/empleadosPrueba/
### `npm install`

### `npm run dev`

## Consulta Jerárquica con Versionamiento:

Se implementó una consulta recursiva que devuelva la jerarquía completa de empleados, con sus respectivos jefes, incluyendo la información de versionamiento. Esta consulta se realizó a través de un servicio web


## Escenario de Actualización:

Cuando se produce un cambio en el jefe de un empleado, se actualizará la relación jerárquica y se incrementará la versión del empleado actualizado. Esto se logrará mediante una transacción en la base de datos.

## Manejo de Nulos:
Cuando un empleado no tiene un jefe directo (por ejemplo, un director), el campo superior_id se establecerá como NULL. Se puede utilizar la consulta jerárquica para obtener la estructura completa, incluso para empleados sin un jefe directo, sin embargo se devuelve la data para poderla visualizar sin ningún problema.

## Ejemplo de Uso:
Existen 2 maneras, por medio de la api directa que se puede encontrar documentada en el SwaggerUI o por medio del frontend.

## Frontend
Se creó un frontend en react.


Descargar proyecto https://github.com/alexanderAngulom/empleadosPrueba/
### `npm install`
### `npm start`

Aquí se puede encontrar como ventana inicial el listado de los empleado(en este caso es requerido insertar los datos manual en la base de datos), clickeando en un elemento (un empleado) se redirige a una ventana nueva donde se puede visualizar la información de ese empleado, tal como su nombre, versión en la que esta (ósea cuantas veces se actualizó de jefe), el nombre del jefe a que pertenece y la identificación de este jefe, y también se puede actualizar el jefe por medio del id del jefe, una vez clieando en el botón de "Update Employee".se reflejará en la base de datos y en la interfaz del card.


## Repositorio de GitHub:
https://github.com/alexanderAngulom/empleadosPrueba/