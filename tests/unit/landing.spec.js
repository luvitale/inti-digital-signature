import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Landing from "@/components/Landing.vue";
import i18n from "@/i18n";

describe("Landing.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Landing, {
      i18n,
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
