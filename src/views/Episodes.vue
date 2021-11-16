<template>
  <v-container fluid class="ma-0 pa-0">
    <search-bar v-intersect="leftTop" app> </search-bar>

    <episodes-time-line />

    <floating-button
      :hidden="!showScrollToTopButton"
      @floating-btn-click="scrollToTop"
    />
  </v-container>
</template>

<script>
import SearchBar from "../components/SearchBar";
import EpisodesTimeLine from "../components/EpisodesTimeLine";
import FloatingButton from "../components/FloatingButton";

export default {
  name: "Episodes",

  components: {
    SearchBar,
    EpisodesTimeLine,
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
