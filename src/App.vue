<template>
  <div id="app">
    <HomePage :hellowMessage="hellowMessage"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from '@pages/home/home.vue';

@Component({
  components: {
    HomePage,
  },
})

export default class App extends Vue {
    public hellowMessage: String = 'Nice To Meet You, Too.'
}
</script>

<style scoped lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
