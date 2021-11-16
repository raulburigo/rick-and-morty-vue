<template>
  <v-container fluid class="ma-0 pa-0">
    <search-bar v-intersect="leftTop" app> </search-bar>

    <characters-list />

    <floating-button
      :hidden="!showScrollToTopButton"
      @floating-btn-click="scrollToTop"
    />
  </v-container>
</template>

<script>
import SearchBar from "../components/SearchBar";
import CharactersList from "../components/CharacterList";
import FloatingButton from "../components/FloatingButton";

export default {
  name: "Characters",

  components: {
    SearchBar,
    CharactersList,
    FloatingButton,
  },

  data: () => ({
    showScrollToTopButton: false,
  }),

  methods: {
    leftTop(entries, observer, isIntersecting) {
      this.showScrollToTopButton = !isIntersecting;
    },
    scrollToTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
