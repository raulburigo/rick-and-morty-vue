/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuetify from "vuetify";

import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import EpisodeCard from "../../src/components/EpisodeCard";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("EpisodeCard.vue", () => {
  let vuetify;
  const ep1 = {
    episode: "S01E01",
    name: "Pilot",
    air_date: "December 2, 2013",
    characters: [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 2,
        name: "Morty Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      {
        id: 357,
        name: "Bepisian",
        image: "https://rickandmortyapi.com/api/character/avatar/35.jpeg",
      },
      {
        id: 387,
        name: "Beth Smith",
        image: "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
      },
      {
        id: 627,
        name: "Canklanker Thom",
        image: "https://rickandmortyapi.com/api/character/avatar/62.jpeg",
      },
      {
        id: 927,
        name: "Davin",
        image: "https://rickandmortyapi.com/api/character/avatar/92.jpeg",
      },
      {
        id: 127,
        name: "Frank Palicky",
        image: "https://rickandmortyapi.com/api/character/avatar/127.jpeg",
      },
    ],
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should have a custom title and match snapshot", async () => {
    const wrapper = mount(EpisodeCard, {
      localVue,
      vuetify,
      propsData: { episode: ep1 },
    });

    await wrapper.setData({ isActive: true });
    expect(wrapper.html()).toMatchSnapshot();

    const title = wrapper.find(".v-card__title");

    expect(title.text()).toBe("S01E01 - Pilot");
  });

  it("should render lazyly", async () => {
    const wrapper = mount(EpisodeCard, {
      localVue,
      vuetify,
      propsData: { episode: ep1 },
    });

    const lazyCardBefore = wrapper.find(".v-card");
    expect(lazyCardBefore.exists()).toBe(false);

    await wrapper.setData({ isActive: true });

    const lazyCardAfter = wrapper.find(".v-card");
    expect(lazyCardAfter.exists()).toBe(true);
  });

  it("should render as many avatar as characters and show tooltip with character name ", async (done) => {
    const wrapper = mount(EpisodeCard, {
      localVue,
      vuetify,
      propsData: { episode: ep1 },
    });

    await wrapper.setData({ isActive: true });

    const avatars = wrapper.findAll(".v-avatar");
    expect(avatars.length).toBe(7);

    const rickAvatar = avatars.at(0);
    rickAvatar.trigger("mouseenter");
    await wrapper.vm.$nextTick();
    requestAnimationFrame(() => {
      expect(wrapper.find(".v-tooltip").text()).toEqual("Rick Sanchez");
      done();
    });
  });

  it("should show up to 6 avatars and show/hide more when btn clicked ", async () => {
    const wrapper = mount(EpisodeCard, {
      localVue,
      vuetify,
      propsData: { episode: ep1 },
    });

    await wrapper.setData({ isActive: true });

    const avatars = wrapper.findAll(".v-avatar");
    expect(avatars.length).toBe(7);

    expect(avatars.at(5).isVisible()).toBe(true);

    expect(avatars.at(6).isVisible()).toBe(false);

    const button = wrapper.find("button");
    await button.trigger("click");
    expect(avatars.at(6).isVisible()).toBe(true);

    await button.trigger("click");
    expect(avatars.at(6).isVisible()).toBe(false);
  });
});
