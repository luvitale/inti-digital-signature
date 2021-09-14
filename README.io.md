<div align="center">
  <img src="build/icons/256x256.png">
  <h1>INTI Komputerala Signato</h1>
</div>

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![eo](https://img.shields.io/badge/lang-eo-green.svg)](README.eo.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)
[![es](https://img.shields.io/badge/lang-io-blue.svg)](README.io.md)
[![pt](https://img.shields.io/badge/lang-pt-darkblue.svg)](README.pt.md)

Apliko por krear privata klavo, obtenar la para publika klavo, signatar savaro y verigar la signatita savaro

## Instalar

La duopla savaro o la fontkodo esas sen por la deskargo e instalo en la segmento [Releases](https://github.com/luvitale/inti-digital-signature/releases).

## Kontinua integralo

La duoplo esas liberigita uzanta GitHub Action.

## Developo

### Antea kondiciono

* [Node.js](https://nodejs.org/download/)
* [Yarn](https://yarnpkg.com/) (rekomendita)

#### Windows

* [Visual Studio](https://www.visualstudio.com/vs/)
* [Python](https://pypi.org/project/pywin32/#files)
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com/)

Plu multa informo en la pagino de la [dokumentigo de Electron](https://www.electronjs.org/docs/development/build-instructions-windows).

### Instalar dependi

> Esas rekomendita uzar [Yarn](http://yarnpkg.com/) vicee NPM.

Kun [Yarn](https://yarnpkg.com/):

```
yarn install
```

O uzanta NPM:

```
npm install
```

### Kompilar por developo (kun varmega kargo)

Kun [Yarn](https://yarnpkg.com/):

```
yarn electron:serve
```

O uzanta NPM:

```
npm run electron:serve
```

### Kompilar e minificar por produktisto

Kun [Yarn](https://yarnpkg.com/):

```
yarn electron:build
```

O uzanta NPM:

```
npm run electron:build
```

### Executar unaja probi

Kun [Yarn](https://yarnpkg.com/):

```
yarn test:unit
```

O uzanta NPM:

```
npm run test:unit
```

### Executar probi de extremo a extremo

Kun [Yarn](https://yarnpkg.com/):

```
yarn test:e2e
```

O uzanta NPM:

```
npm run test:e2e
```

### Chekar y korektigar kodo

Kun [Yarn](https://yarnpkg.com/):

```
yarn lint
```

O uzanta NPM:

```
npm run lint
```
