<template>
  <v-card class="mx-auto overflow-auto" flat>
    <v-container fluid>
      <h2 v-if="!$apollo.loading && characters.results.length == 0">
        nenhum personagem encontrado
      </h2>
      <v-row dense v-if="!$apollo.loading">
        <v-col
          v-for="char in orderedCharacters"
          :key="char.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <character-card v-bind:char="char" />
        </v-col>
      </v-row>

      <!-- loading -->
      <v-row dense v-else>
        <v-col
          v-for="item in Array.from({ length: 8 }, (k, v) => v + 1)"
          :key="item"
          height="600px"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-if="!$apollo.loading"
      v-model="page"
      circle
      :length="characters.info.pages"
      :total-visible="5"
      color="#2fa030"
      class="mb-6"
    ></v-pagination>
  </v-card>
</template>

<script>
import gql from "graphql-tag";
import CharacterCard from "../components/CharacterCard.vue";
import _ from "lodash";
import { mapState } from "vuex";

const GET_CHARACTERS = gql`
  query AllCharactersSearchQuery($searchText: String! = "", $page: Int! = 1) {
    characters(page: $page, filter: { name: $searchText }) {
      info {
        pages
        next
      }
      results {
        id
        name
        image
        origin {
          name
        }
        episode {
          episode
          name
          air_date
        }
      }
    }
  }
`;

export default {
  name: "CharactersList",

  components: { CharacterCard },

  data: () => ({
    page: 1,
  }),

  computed: {
    ...mapState(["searchText", "sortOrder"]),
    orderedCharacters: function () {
      return _.orderBy(this.characters.results, "name", this.sortOrder);
    },
  },

  apollo: {
    characters: {
      query: GET_CHARACTERS,
      variables() {
        return {
          searchText: this.searchText,
          page: this.page,
        };
      },
      error(error) {
        if (
          error.graphQLErrors.some((err) => {
            return err.extensions.response.status == 404;
          })
        ) {
          {
            this.characters = {
              results: [],
              info: {
                pages: 0,
                next: null,
              },
            };
          }
        }
      },
    },
  },

  watch: {
    searchText: function () {
      this.page = 1;
    },
    page: function () {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
