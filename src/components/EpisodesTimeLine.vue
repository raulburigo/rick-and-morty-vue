<template>
  <v-card class="mx-auto" min-height="100vh">
    <v-container>
      <h2 v-if="!$apollo.loading && episodes.results.length == 0">
        nenhum episódio encontrado
      </h2>
      <v-timeline
        v-if="!$apollo.loading || page > 1"
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(ep, epIndex) in orderedEpisodes"
          :key="ep.episode"
          fill-dot
          v-bind:small="$vuetify.breakpoint.smAndDown"
          color="#3bb5c0"
        >
          <episode-card v-bind:episode="ep" v-bind:even="epIndex % 2 != 0" />
        </v-timeline-item>
      </v-timeline>

      <!-- esqueleto -->
      <v-timeline v-if="$apollo.loading" :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="item in Array.from({ length: 3 }, (k, v) => v + 1)"
          :key="item.index"
          fill-dot
          v-bind:small="$vuetify.breakpoint.smAndDown"
          color="#3bb5c0"
        >
          <v-skeleton-loader
            class="mx-auto"
            type="card, avatar"
          ></v-skeleton-loader>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-card v-intersect="infiniteScrolling"></v-card>
  </v-card>
</template>

<script>
import gql from "graphql-tag";
import EpisodeCard from "../components/EpisodeCard.vue";
import _ from "lodash";
import { mapState } from "vuex";

const GET_EPISODES = gql`
  query AllEpisodesSearchQuery($searchText: String! = "", $page: Int! = 1) {
    episodes(page: $page, filter: { name: $searchText }) {
      info {
        pages
        next
      }
      results {
        episode
        name
        air_date
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

export default {
  name: "EpisodesTimeLine",

  components: { EpisodeCard },

  data: () => ({
    page: 1,
  }),

  computed: {
    ...mapState(["searchText", "sortOrder"]),
    orderedEpisodes: function () {
      return _.orderBy(this.episodes?.results, "episode", this.sortOrder);
    },
  },

  apollo: {
    episodes: {
      query: GET_EPISODES,
      variables() {
        return {
          searchText: this.searchText,
        };
      },
      error(error) {
        if (
          error.graphQLErrors.some((err) => {
            return err.extensions.response.status == 404;
          })
        ) {
          this.episodes = {
            results: [],
            info: {
              next: null,
            },
          };
        }
      },
    },
  },

  methods: {
    async fetchMore() {
      this.page++;
      this.$apollo.queries.episodes.fetchMore({
        variables: {
          page: this.episodes.info.next,
        },
        updateQuery: (existing, incoming) => {
          return {
            episodes: {
              ...existing.episodes,
              results: [
                ...existing.episodes.results,
                ...incoming.fetchMoreResult.episodes.results,
              ],
              info: incoming.fetchMoreResult.episodes.info,
            },
          };
        },
      });
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      if (!this.$apollo.loading && this.episodes?.info.next && isIntersecting) {
        this.fetchMore();
      }
    },
  },

  watch: {
    searchText: function () {
      this.page = 1;
    },
  },
};
</script>
