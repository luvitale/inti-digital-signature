<div align="center">
  <img src="build/icons/256x256.png">
  <h1>Assinatura Digital INTI</h1>
</div>

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![eo](https://img.shields.io/badge/lang-eo-green.svg)](README.eo.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)
[![es](https://img.shields.io/badge/lang-io-blue.svg)](README.io.md)
[![pt](https://img.shields.io/badge/lang-pt-darkblue.svg)](README.pt.md)

Programa para criar chaves privadas, obter a chave pública emparelhada, assinar arquivos e verificar o arquivo assinado usando OpenSSL

## Instalar

Os binários ou código-fonte estão disponíveis para download e instalação na seção [Releases](https://github.com/luvitale/inti-digital-signature/releases).

## Integração contínua

Os binários são lançados usando GitHub Action.

## Desenvolvimento

### Requisitos anteriores

* [Node.js](https://nodejs.org/download/)
* [Yarn](https://yarnpkg.com/) (recomendado)

#### Windows

* [Visual Studio](https://www.visualstudio.com/vs/)
* [Python](https://pypi.org/project/pywin32/#files)
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com/)

Mais informações na página de [documentação do Electron](https://www.electronjs.org/docs/development/build-instructions-windows).

### Instalar dependências

> É recomendado usar [Yarn](http://yarnpkg.com/) em vez de NPM.

Com [Yarn](https://yarnpkg.com/):

```
yarn install
```

Ou usando NPM:

```
npm install
```

### Compilar para desenvolvimento (com recarregamento a quente)

Com [Yarn](https://yarnpkg.com/):

```
yarn electron:serve
```

Ou usando NPM:

```
npm run electron:serve
```

### Compilar e minimizar para produção

Com [Yarn](https://yarnpkg.com/):

```
yarn electron:build
```

Ou usando NPM:

```
npm run electron:build
```

### Executar testes de unidade

Com [Yarn](https://yarnpkg.com/):

```
yarn test:unit
```

Ou usando NPM:

```
npm run test:unit
```

### Executar testes ponta a ponta

Com [Yarn](https://yarnpkg.com/):

```
yarn test:e2e
```

Ou usando NPM:

```
npm run test:e2e
```

### Lint o código

Com [Yarn](https://yarnpkg.com/):

```
yarn lint
```

Ou usando NPM:

```
npm run lint
```
