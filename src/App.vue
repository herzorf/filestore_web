<template>
  <div class="wrapper">
    <router-view></router-view>
    <router-link to="/signin">signin</router-link>
    <router-link to="/signup">signup</router-link>
    <router-link to="/home">home</router-link>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    height: 100vh;
  }
</style>
