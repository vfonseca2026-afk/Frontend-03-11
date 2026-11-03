# Pokédex — Buscador de Pokémon

Aplicación web desarrollada con React y Vite que permite buscar Pokémon por su código numérico mediante PokéAPI.

## Funcionalidades

- Búsqueda de Pokémon por código.
- Visualización de nombre, imagen, tipos, altura y peso.
- Validación de códigos ingresados.
- Indicador de carga durante la consulta.
- Mensajes de error ante Pokémon inexistentes o problemas de conexión.
- Almacenamiento en memoria de consultas realizadas durante la sesión.
- Diseño adaptable a dispositivos móviles.

## Tecnologías

- React
- JavaScript
- CSS
- Vite
- PokéAPI
- Git y GitHub

## Instalación y ejecución

Necesitas tener Node.js y npm instalados.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/vfonseca2026-afk/Frontend-03-11.git
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd Frontend-03-11
   ```

   Si `package.json` está dentro de una subcarpeta, entra en ella antes de continuar.

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre en el navegador la dirección indicada en la terminal.

Para detener el servidor, presiona `Ctrl + C`.

## Uso

1. Ingresa un código numérico mayor que cero.
2. Presiona **Buscar** o la tecla **Enter**.
3. Espera a que aparezca la información del Pokémon.

Ejemplos:

| Código | Pokémon |
| ------ | ------- |
| 1      | Bulbasaur |
| 4      | Charmander |
| 7      | Squirtle |
| 25     | Pikachu |

La aplicación necesita conexión a internet para consultar nuevos Pokémon y cargar sus imágenes.

## API utilizada

La aplicación consume el siguiente endpoint de PokéAPI:

```text
https://pokeapi.co/api/v2/pokemon/{id}/
```

Ejemplo de consulta:

```text
https://pokeapi.co/api/v2/pokemon/25/
```

No requiere una clave de API.

La altura recibida se convierte de decímetros a metros y el peso de hectogramos a kilogramos.

Documentación: [PokéAPI](https://pokeapi.co/docs/v2)

## Estructura principal

```text
src/
├── App.jsx       # Formulario, consulta a la API y resultados
├── App.css       # Estilos del buscador
├── index.css     # Estilos generales
└── main.jsx      # Punto de entrada de React
```

## Comandos disponibles

| Comando | Descripción |
| ------- | ----------- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Permite revisar la compilación de producción localmente. |
| `npm run lint` | Revisa el código con ESLint. |

## Pruebas manuales

| Entrada o situación | Resultado esperado |
| ------------------- | ------------------ |
| `25` | Muestra a Pikachu y sus datos. |
| `0001` | Muestra a Bulbasaur. |
| `0`, texto o decimales | Muestra un mensaje de validación. |
| `999999` | Informa que no existe un Pokémon con ese código. |
| Consulta nueva sin conexión | Muestra un error de conexión. |

## Trabajo colaborativo

Cada integrante trabaja en su propia rama y propone sus cambios mediante un Pull Request hacia `main`.

Antes de incorporar cambios de `main`, guarda tu trabajo en un commit. Luego ejecuta desde tu rama:

```bash
git fetch origin
git merge origin/main
git push
```

Los Pull Requests deben ser revisados por otro integrante antes de integrarse.

No se deben subir `node_modules`, archivos `.env` ni credenciales.

## Créditos

Datos e imágenes proporcionados por [PokéAPI](https://pokeapi.co/).

Proyecto académico para practicar React, consumo de APIs y trabajo colaborativo con Git y GitHub.