<template>
  <v-app id="my-app">
    <v-app-bar color="#2fa030" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.name || "Rick And Morty" }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleDarkMode">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-img src="@/assets/title.png" alt=""></v-img>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav rounded>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer absolute dark padless>
      <v-card class="flex white--text text-center" flat tile color="#1b661f">
        <v-card-title>
          <v-spacer></v-spacer>

          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4"
            dark
            icon
            :to="icon.to"
            target="_blank"
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Raul Burigo</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      navItems: [
        { title: "Início", icon: "mdi-home-outline", to: "/" },
        { title: "Personagens", icon: "mdi-flask-outline", to: "/personagens" },
        { title: "Episódios", icon: "mdi-virus-outline", to: "/episodios" },
        { title: "Sobre", icon: "mdi-help-circle-outline", to: "/sobre" },
      ],
      icons: [
        { icon: "mdi-github", to: "/github" },
        { icon: "mdi-linkedin", to: "/linkedin" },
      ],
    };
  },

  methods: {
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },

  watch: {
    $route() {
      this.$store.dispatch("clearSearch");
      this.$store.dispatch("clearOrder");
    },
  },

  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  background: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background: #555;
  border: 2px solid #555555;
}
</style>
