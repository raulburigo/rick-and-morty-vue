/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuetify from "vuetify";

import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import CharacterCard from "../../src/components/CharacterCard";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("CharacterCard.vue", () => {
  let vuetify;
  const rickCard = {
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
  };
  const alienMortyCard = {
    id: 14,
    image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    origin: {
      name: "unknown",
    },
    name: "Alien Morty",
    episode: [
      {
        episode: "S01E10",
        name: "Close Rick-counters of the Rick Kind",
      },
    ],
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should have a custom title and subtitle and match snapshot", () => {
    const wrapper = mount(CharacterCard, {
      localVue,
      vuetify,
      propsData: { char: rickCard },
    });

    expect(wrapper.html()).toMatchSnapshot();

    const title = wrapper.find(".v-card__title");

    expect(title.text()).toBe("Rick Sanchez");

    const subTitle = wrapper.find(".v-card__subtitle");

    expect(subTitle.text()).toBe("Earth (C-137)");
  });

  it("should have a subtitle 'Origem Desconhecida' when origin name is 'unknown'", () => {
    const wrapper = mount(CharacterCard, {
      localVue,
      vuetify,
      propsData: { char: alienMortyCard },
    });

    const subTitle = wrapper.find(".v-card__subtitle");

    expect(subTitle.text()).toBe("Origem desconhecida");
  });

  it("should have as many scroll items as episodes with custom title and subtitle", () => {
    const rickWrapper = mount(CharacterCard, {
      localVue,
      vuetify,
      propsData: { char: rickCard },
    });

    const scrollItems = rickWrapper.findAll(
      ".v-virtual-scroll__container > .v-virtual-scroll__item"
    );

    expect(scrollItems.length).toBe(2);

    const epTitles = rickWrapper.findAll(".v-list-item__title");
    expect(epTitles.at(0).text()).toBe("S01E01");
    expect(epTitles.at(1).text()).toBe("S01E02");

    const epSubTitles = rickWrapper.findAll(".v-list-item__subtitle");
    expect(epSubTitles.at(0).text()).toBe("Pilot");
    expect(epSubTitles.at(1).text()).toBe("Lawnmower Dog");

    const alienMortyWrapper = mount(CharacterCard, {
      localVue,
      vuetify,
      propsData: { char: alienMortyCard },
    });

    const newScrollItems = alienMortyWrapper.findAll(
      ".v-virtual-scroll__container > .v-virtual-scroll__item"
    );

    expect(newScrollItems.length).toBe(1);
  });

  it("should show/hide episodes when button clicked", async () => {
    const wrapper = mount(CharacterCard, {
      localVue,
      vuetify,
      propsData: { char: rickCard },
    });

    const button = wrapper.find(".v-card__actions > .v-btn--icon");
    const episodes = wrapper.find('[data-testid="episodes"]');

    expect(episodes.isVisible()).toBe(false);

    await button.trigger("click");
    expect(episodes.isVisible()).toBe(true);

    await button.trigger("click");
    expect(episodes.isVisible()).toBe(false);
  });
});
