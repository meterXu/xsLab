<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media (min-width: 576px){
  .bd-masthead {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
.bd-masthead {
    padding-bottom: 4rem;
  }
</style>
