<div align="center">
  <img src="build/icons/256x256.png">
  <h1>INTI Digital Signature</h1>
</div>

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![eo](https://img.shields.io/badge/lang-eo-green.svg)](README.eo.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)
[![es](https://img.shields.io/badge/lang-io-blue.svg)](README.io.md)
[![pt](https://img.shields.io/badge/lang-pt-darkblue.svg)](README.pt.md)

Application to generate private keys, obtain the paired public key, sign files and verify the signed file using OpenSSL.

## Quick Start

You can download binaries or source in [Releases](https://github.com/luvitale/inti-digital-signature/releases) section and install it.

## Continuous Integration

Binaries are released using GitHub Action.

## Development

### Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/en/) (optional)

#### Windows

* [Visual Studio](https://www.visualstudio.com/vs/)
* [Python](https://pypi.org/project/pywin32/#files)
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com/)

Read more in [Electron Documentation page](https://www.electronjs.org/docs/development/build-instructions-windows)

### Install dependencies

> [Yarn](http://yarnpkg.com/) is strongly recommended instead of NPM.

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn install
```

Or if you use NPM:

```
npm install
```

### Compiles and hot-reloads for development

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn electron:serve
```

Or if you use NPM:

```
npm run electron:serve
```

### Compiles and minifies for production

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn electron:build
```

Or if you use NPM:

```
npm run electron:build
```

### Run your unit tests

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn test:unit
```

Or if you use NPM:

```
npm run test:unit
```

### Run your end-to-end tests

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn test:e2e
```

Or if you use NPM:

```
npm run test:e2e
```

### Lints and fixes files

If you use [Yarn](https://yarnpkg.com/en/):

```
yarn lint
```

Or if you use NPM:

```
npm run lint
```

### Additional information

This program was translated using [Vue i18n](https://github.com/intlify/vue-cli-plugin-i18n)

See [Configuration Reference](https://cli.vuejs.org/config/).
