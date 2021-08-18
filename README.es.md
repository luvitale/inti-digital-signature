<div align="center">
  <img src="build/icons/256x256.png">
  <h1>Firma Digital INTI</h1>
</div>

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![eo](https://img.shields.io/badge/lang-eo-green.svg)](README.eo.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-blue.svg)](README.pt.md)

Programa para crear claves privadas, obtener la clave pública emparejada, firmar archivos y verificar el archivo firmado utilizando OpenSSL

## Instalar

Los archivos binarios o el código fuente está disponible para la descarga e instalación en la sección [Releases](https://github.com/luvitale/inti-digital-signature/releases).

## Integración continua

Los binarios son lanzados utilizando GitHub Action.

## Desarrollo

### Requisitos previos

* [Node.js](https://nodejs.org/download/)
* [Yarn](https://yarnpkg.com/) (recomendado)

#### Windows

* [Visual Studio](https://www.visualstudio.com/vs/)
* [Python](https://pypi.org/project/pywin32/#files)
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com/)

Más información en la página de la [documentación de Electron](https://www.electronjs.org/docs/development/build-instructions-windows).

### Instalar dependencias

> Se recomienda usar [Yarn](http://yarnpkg.com/) en lugar de NPM.

Con [Yarn](https://yarnpkg.com/):

```
yarn install
```

O usando NPM:

```
npm install
```

### Compilar para desarrollo (con recarga en caliente)

Con [Yarn](https://yarnpkg.com/):

```
yarn electron:serve
```

O usando NPM:

```
npm run electron:serve
```

### Compilar y minificar para producción

Con [Yarn](https://yarnpkg.com/):

```
yarn electron:build
```

O usando NPM:

```
npm run electron:build
```

### Ejecutar pruebas unitarias

Con [Yarn](https://yarnpkg.com/):

```
yarn test:unit
```

O usando NPM:

```
npm run test:unit
```

### Ejecutar pruebas de extremo a extremo

Con [Yarn](https://yarnpkg.com/):

```
yarn test:e2e
```

O usando NPM:

```
npm run test:e2e
```

### Comprobar y corregir código

Con [Yarn](https://yarnpkg.com/):

```
yarn lint
```

O usando NPM:

```
npm run lint
```
