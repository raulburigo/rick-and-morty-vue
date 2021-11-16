<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-card
      shrink
      elevation="10"
      :class="{
        'text-right': even && !$vuetify.breakpoint.smAndDown,
      }"
    >
      <v-card-title
        primary-title
        class="text-wrap"
        :class="{
          'justify-end': even && !$vuetify.breakpoint.smAndDown,
        }"
        >{{ episode.episode }} - {{ episode.name }}</v-card-title
      >
      <v-card-subtitle
        v-text="
          new Date(Date.parse(episode.air_date)).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        "
        :class="{
          'justify-end': even && !$vuetify.breakpoint.smAndDown,
        }"
      ></v-card-subtitle>
      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <v-row class="pt-1" ref="episode">
          <v-col class="mr-1">
            <v-tooltip
              bottom
              v-for="(char, index) in episode.characters"
              :key="char.id"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-avatar v-show="index <= 5 || show" v-bind="attrs" v-on="on">
                  <v-img :src="char.image"></v-img>
                </v-avatar>
              </template>

              <span>{{ char.name }}</span>
            </v-tooltip>

            <v-btn
              class="my-2 ml-2"
              icon
              outlined
              v-bind:style="{ color: btnColor }"
              v-if="episode.characters.length > 5"
              @click="show = !show"
            >
              <v-icon dark>
                {{ !show ? "mdi-plus" : "mdi-minus" }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-lazy>
</template>

<script>
export default {
  name: "EpisodeCard",

  props: { episode: Object, even: Boolean },

  data: function () {
    return {
      show: false,
      isActive: false,
    };
  },

  computed: {
    btnColor: function () {
      return this.$vuetify.theme.dark ? "#80e032" : "#1b661f";
    },
  },
};
</script>
