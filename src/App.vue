<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/generate-private-key">Generar clave privada</router-link> |
      <router-link to="/generate-public-key">Generar clave pública</router-link> |
      <router-link to="/sign">Firmar</router-link> |
      <router-link to="/verify">Verificar</router-link>
    </div>
    <v-img
      class="mx-auto"
      id="inti-logo"
      alt="Logo del INTI"
      src="./assets/logo.png"
      max-width="300px"
      max-height="300px" />
    <router-view />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
