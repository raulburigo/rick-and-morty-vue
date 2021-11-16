import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import MyButton from "../components/MyButton.vue";
import SearchBar from "../components/SearchBar.vue";
import vuetify from "@/plugins/vuetify";

storiesOf("Button", module)
  .add("withText", () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action("clicked") },
  }))
  .add("withJSX", () => ({
    components: { MyButton },
    render() {
      return <my-button onClick={this.action}>With JSX</my-button>;
    },
    methods: { action: linkTo("Button", "with some emoji") },
  }))
  .add("with some emoji", () => ({
    components: { MyButton },
    template: "<my-button>😀 😎 👍 💯</my-button>",
  }));

storiesOf("Scroll To Top Button", module)
  .addDecorator(() => ({
    vuetify,
    template: "<v-app><story/></v-app>",
  }))
  .add("withText", () => ({
    components: { SearchBar },
    template: "<search-bar></search-bar>",
  }));
