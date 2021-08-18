<div align="center">
  <img src="build/icons/256x256.png">
  <h1>INTI Cifereca Subskribo</h1>
</div>

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![eo](https://img.shields.io/badge/lang-eo-green.svg)](README.eo.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)
[![pt](https://img.shields.io/badge/lang-pt-blue.svg)](README.pt.md)

Programo por krei privatajn ŝlosilojn, akiri la parigitan publikan ŝlosilon, subskribi dosierojn kaj kontroli la subskribitan dosieron per OpenSSL

## Instali

Duumaj dosieroj aŭ fontkodo estas elŝuteblaj kaj instaleblaj en la sekcio [Releases](https://github.com/luvitale/inti-digital-signature/releases).

## Kontinua integriĝo

Duumaj dosieroj estas liberigitaj per GitHub Action.

## Disvolviĝo

### Antaŭaj postuloj

* [Node.js](https://nodejs.org/download/)
* [Yarn](https://yarnpkg.com/) (rekomendita)

#### Vindozo

* [Visual Studio](https://www.visualstudio.com/vs/)
* [Python](https://pypi.org/project/pywin32/#files)
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com/)

Pliaj informoj en la paĝo pri [dokumentado pri Elektrono](https://www.electronjs.org/docs/development/build-instructions-windows).

### Instali dependecoj

> Oni rekomendas uzi [Yarn](http://yarnpkg.com/) anstataŭ NPM.

Kun [Yarn](https://yarnpkg.com/):

```
yarn install
```

Aŭ uzante NPM:

```
npm install
```

### Konstrui por disvolviĝo (kun varma reŝarĝo)

Kun [Yarn](https://yarnpkg.com/):

```
yarn electron:serve
```

Aŭ uzante NPM:

```
npm run electron:serve
```

### Konstrui kaj malgrandigi por produktado

Kun [Yarn](https://yarnpkg.com/):

```
yarn electron:build
```

Aŭ uzante NPM:

```
npm run electron:build
```

### Fari unuajn testojn

Kun [Yarn](https://yarnpkg.com/):

```
yarn test:unit
```

Aŭ uzante NPM:

```
npm run test:unit
```

### Kuri fin-al-finajn testojn

Kun [Yarn](https://yarnpkg.com/):

```
yarn test:e2e
```

Aŭ uzante NPM:

```
npm run test:e2e
```

### Lint-kodo

Kun [Yarn](https://yarnpkg.com/):

```
yarn lint
```

Aŭ uzante NPM:

```
npm run lint
```
