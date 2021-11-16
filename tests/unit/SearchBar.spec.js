import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import SearchBar from "../../src/components/SearchBar";

const localVue = createLocalVue();
Vue.use(Vuetify);
localVue.use(Vuex);

describe("SearchBar.vue", () => {
  let vuetify;
  let actions;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = {
      setSearch: jest.fn(),
      setOrder: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("mounts and renders", () => {
    const wrapper = shallowMount(SearchBar, { localVue, vuetify });

    expect(wrapper.html()).toBeTruthy();
  });

  it("set SearchText state when input text changes", async () => {
    const wrapper = mount(SearchBar, { store, localVue, vuetify });

    const textInput = wrapper.find('input[type="text"]');

    expect(textInput.exists()).toBe(true);
    expect(textInput.element.value).toBe("");
    expect(wrapper.vm.$data.searchText).toBe("");

    await textInput.setValue("rick");

    expect(textInput.element.value).toBe("rick");
    expect(wrapper.vm.$data.searchText).toBe("rick");
  });

  it('dispatches "setSearch" when SearchText changes', async () => {
    const wrapper = shallowMount(SearchBar, { store, localVue, vuetify });

    expect(actions.setSearch).toHaveBeenCalledTimes(0);

    await wrapper.setData({ searchText: "rick" });

    expect(actions.setSearch).toHaveBeenCalledTimes(1);
  });

  it("change sortOrder when btn clicked", async () => {
    const wrapper = mount(SearchBar, {
      store,
      localVue,
      vuetify,
    });

    const button = wrapper.find('[data-testid="sort-button"]');

    expect(button.exists()).toBe(true);
    expect(wrapper.vm.$data.sortOrder).toBe("asc");

    await button.trigger("click");

    expect(wrapper.vm.$data.sortOrder).toBe("desc");
  });

  it('dispatches "setOrder" when sortOrder changes', async () => {
    const wrapper = shallowMount(SearchBar, { store, localVue, vuetify });

    expect(actions.setOrder).toHaveBeenCalledTimes(0);

    await wrapper.setData({ sortOrder: "desc" });

    expect(actions.setOrder).toHaveBeenCalledTimes(1);
  });

  it("icon changes when sortOrder change", async () => {
    const wrapper = shallowMount(SearchBar, { store, localVue, vuetify });

    const icon = wrapper.find('[data-testid="sort-icon"]');

    expect(icon.html()).toBe(
      '<v-icon-stub datatestid="sort-icon" data-testid="sort-icon">mdi-sort-alphabetical-ascending</v-icon-stub>'
    );

    await wrapper.setData({ sortOrder: "desc" });

    expect(icon.html()).toBe(
      '<v-icon-stub datatestid="sort-icon" data-testid="sort-icon">mdi-sort-alphabetical-descending</v-icon-stub>'
    );

    await wrapper.setData({ sortOrder: "asc" });

    expect(icon.html()).toBe(
      '<v-icon-stub datatestid="sort-icon" data-testid="sort-icon">mdi-sort-alphabetical-ascending</v-icon-stub>'
    );
  });
});
