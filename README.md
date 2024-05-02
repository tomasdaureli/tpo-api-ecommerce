# Setup local

Para poder levantar el proyecto local seguir estos pasos

### Clonar repositorio

```bash
git clone https://github.com/tomasdaureli/tpo-api-ecommerce.git
```

### Entrar al directorio del proyecto
```bash
cd tpo-api-ecommerce
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar aplicación
```bash
npm run dev
```

### Ejectuar Json-Server
Para que se carguen los productos y usuarios guardados se debe iniciar el Json-Server que simula el backend de la aplicacion.
Para eso, en una nueva terminal, ejecutar los siguientes comandos:
```bash
# Instalar libreria json-server
npm install -g json-server@0.17.4
# Ejecutar servidor
json-server --watch ./src/json-server/db.json
```
