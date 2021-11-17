<template>
  <v-container>
    <h1 class="mt-6">Sobre</h1>
    <p class="mt-6">
      Este site foi construído em VueJS, utilizando Vuetify, Apollo e Vuex.
    </p>
    <p v-html="text"></p>
  </v-container>
</template>

<script>
export default {
  name: "About",

  data: () => ({
    text:
      "Consumimos a api <a href='https://rickandmortyapi.com/' target='_blank'>https://rickandmortyapi.com/</a> em GraphQL.",
  }),
};
</script>
