<script setup lang="ts">
import { RouterView } from "vue-router";
import {
  NConfigProvider,
  NMessageProvider,
  type GlobalThemeOverrides,
} from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#40D1D7",
    primaryColorHover: "#27B7BD",
  },
};
</script>

<template>
  <n-config-provider :themeOverrides="themeOverrides">
    <n-message-provider>
      <router-view :key="$route.fullPath" />
    </n-message-provider>
    <a class="beian" href="https://beian.miit.gov.cn" target="_blank"
      >京ICP备2023034224号-1</a
    >
  </n-config-provider>
</template>

<style scoped>
.beian {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  text-align: center;
  font-size: 1em;
  color: #aaa;
}
</style>
