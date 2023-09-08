## <em> MODULO DE LOGIN: ARQUITECTURA HEXAGONAL Y DDD </em>
☑️ Proyecto Terminado ☑️

Este repositorio levanta un servidor backend de NodeJs para un modulo de Login. Todo esto aplicando buenas practicas con Arquitectura Hexagonal y DDD.

## 📔 Funcionalidades

- `Registrar Usuario`: Permite registrar un usuario de acuerdo a las siguientes reglas de negocio: 
    - El correo debe ser un correo valido (debe terminar en @___.com).
    - La clave debe contener mayúsculas, signos especiales, números y mínimo 8 caracteres (Ejem: Clavenueva1.).
    - El correo y el nombre de usuario son únicos.
- `Ver Lista de Usuarios`: Se podrá acceder a la lista de usuarios con paginación.
- `Login de Usuario`: El usuario podrá iniciar sesión son su nombre de usuario y contraseña. Sólo puede haber una sesión abierta.
- `Ver perfil del usuario`: El usuario podrá ver sus datos de perfil siempre y cuando tenga una sesión iniciada.
- `Logout de Usuario`: El usuario podrá cerrar la sesión.

## 🛠️ Cómo correr el proyecto

Clonar el reposiorio:
```bash
git clone https://github.com/Avila-Tek/next-template.git <folder_name>
```
Luego muevete a la carpeta y descarga las dependencias y ejecuta el proyecto
```bash
npm install
npm run start
```
## 🛠️ Rutas y Bodys
#### POST /register
```bash
{
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string@gmail.com"
}
```
#### GET /users?page=number&limit=number
#### POST /login
```bash
{
    "username": "string",
    "password": "string"
}
```
#### POST /logout


#### GET /profile

