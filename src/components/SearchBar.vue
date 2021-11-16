<template>
  <v-toolbar>
    <v-text-field
      v-model="searchText"
      ref="searchInput"
      hide-details="auto"
      prepend-inner-icon="mdi-magnify"
      outlined
      dense
      rounded
    >
    </v-text-field>

    <v-btn icon @click="toggleSortOrder" data-testid="sort-button">
      <v-icon data-testid="sort-icon">{{
        `mdi-sort-alphabetical-${sortOrder}ending`
      }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "SearchBar",

  data: () => ({
    searchText: "",
    sortOrder: "asc",
  }),

  methods: {
    toggleSortOrder() {
      this.sortOrder = this.sortOrder == "asc" ? "desc" : "asc";
    },
  },

  watch: {
    searchText: function () {
      this.$store.dispatch("setSearch", this.searchText);
    },
    sortOrder: function () {
      this.$store.dispatch("setOrder", this.sortOrder);
    },
  },
};
</script>
