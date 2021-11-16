<template>
  <v-scale-transition origin="center center 0">
    <v-btn
      data-testid="floating-button"
      v-show="!hidden"
      color="#80e032"
      dark
      fixed
      bottom
      right
      fab
      class="ma-4"
      @click="click"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  name: "FloatingButton",

  data: () => ({}),

  props: {
    hidden: { type: Boolean, default: false },
  },

  methods: {
    click() {
      this.$emit("floating-btn-click");
    },
  },
};
</script>
