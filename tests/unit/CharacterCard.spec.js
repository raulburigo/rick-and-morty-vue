/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuetify from "vuetify";

import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import CharacterCard from "../../src/components/CharacterCard";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("CharacterCard.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("mounts and renders", () => {
    const wrapper = shallowMount(CharacterCard, {
      localVue,
      vuetify,
      propsData: {
        char: {
          id: 1,
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          origin: {
            name: "Earth (C-137)",
          },
          name: "Rick Sanchez",
          episode: [
            {
              episode: "S01E01",
              name: "Pilot",
            },
            {
              episode: "S01E02",
              name: "Lawnmower Dog",
            },
          ],
        },
      },
    });

    expect(wrapper.html()).toBeTruthy();
  });
});
