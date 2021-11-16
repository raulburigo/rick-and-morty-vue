import Vue from "vue";
import Vuetify from "vuetify";

import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import FloatingButton from "../../src/components/FloatingButton";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("FloatingButton.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("mounts and renders", () => {
    const wrapper = shallowMount(FloatingButton, { localVue, vuetify });

    expect(wrapper.html()).toBeTruthy();
  });

  it("should render btn with i inside", () => {
    const wrapper = mount(FloatingButton, {
      localVue,
      vuetify,
      propsData: { hidden: false },
    });

    const btn = wrapper.find("button");

    expect(btn.findAll("i")).toHaveLength(1);
  });

  it("should emit floating-btn-click event", async () => {
    const wrapper = mount(FloatingButton, {
      localVue,
      vuetify,
      propsData: { hidden: false },
    });

    const btn = wrapper.find("button");

    await btn.trigger("click");

    expect(wrapper.emitted("floating-btn-click")).toHaveLength(1);
  });

  it("should not render FloatingButton when hidden is true", async () => {
    const wrapper = mount(FloatingButton, {
      localVue,
      vuetify,
      propsData: { hidden: true },
    });

    let i = wrapper.find("i");

    expect(i.isVisible()).toBe(false);
  });

  it("should render FloatingButton when hidden is false", async () => {
    const wrapper = mount(FloatingButton, {
      localVue,
      vuetify,
      propsData: { hidden: false },
    });

    let i = wrapper.find("i");

    expect(i.isVisible()).toBe(true);
  });
});
