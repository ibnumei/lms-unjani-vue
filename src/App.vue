<template>
  <div class="h-100">
    <router-view />
    <color-switcher v-show="false" />
  </div>
</template>

<script>
import ColorSwitcher from "./components/Common/ColorSwitcher";
import { setThemeColor } from "@/utils";

import { getDirection } from "./utils";

export default {
  components: {
    "color-switcher": ColorSwitcher
  },
  beforeMount() {
    setThemeColor('light.greenlime')
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.dir = "rtl";
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.dir = "ltr";
      document.body.classList.remove("rtl");
    }
  }
};
</script>
