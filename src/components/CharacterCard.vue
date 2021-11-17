<template>
  <v-card>
    <v-img
      :src="char.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      cover
    >
    </v-img>
    <v-card-title v-text="char.name"></v-card-title>
    <v-card-subtitle>
      <span v-if="char.origin.name != 'unknown'">{{ char.origin.name }}</span>
      <span v-else>Origem desconhecida</span>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="#3bb5c0" text> Episódios </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show" data-testid="episodes">
        <v-divider></v-divider>

        <v-card-text>
          <v-virtual-scroll
            :items="char.episode"
            :item-height="50"
            :bench="3"
            min-height="65"
            max-height="150"
          >
            <template v-slot="{ item }">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.episode }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "CharacterCard",

  props: { char: Object },

  data: function () {
    return {
      show: false,
    };
  },
};
</script>
