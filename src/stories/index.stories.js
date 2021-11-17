import { storiesOf } from "@storybook/vue";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import SearchBar from "../components/SearchBar.vue";
import vuetify from "@/plugins/vuetify";

storiesOf("Scroll To Top Button", module)
  .addDecorator(() => ({
    vuetify,
    template: "<v-app><story/></v-app>",
  }))
  .add("withText", () => ({
    components: { SearchBar },
    template: "<search-bar></search-bar>",
  }));
