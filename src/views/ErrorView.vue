<script setup lang="ts">
import { NButton, NCard } from "naive-ui";

const props = defineProps<{
  code: number;
  msg?: string;
}>();

const code = props.code;

const header = (code: number) => {
  switch (code) {
    case 500:
      return "errorview.internal_error";
    case 462:
      return "errorview.session_not_found";
    case 401:
      return "errorview.unauthorized";
    default:
      return "errorview.unknown_error";
  }
};

const detail = (code: number) => {
  switch (code) {
    case 500:
      return "errorview.internal_error_hint";
    case 462:
      return "errorview.session_not_found_hint";
    case 401:
      return "errorview.unauthorized_hint";
    default:
      return "errorview.unknown_error_hint";
  }
};

const msg = props.msg;

// clear local storage
localStorage.clear();
</script>

<template>
  <div class="error_container">
    <n-card class="error_container_card">
      <template #header>
        <h1>{{ $t(header(code)) }}</h1>
      </template>
      <p>{{ $t(detail(code)) }}</p>
      <p v-if="msg">{{ msg }}</p>
    </n-card>

    <n-button @click="$router.push({ name: 'home' })">{{
      $t("errorview.back")
    }}</n-button>
  </div>
</template>

<style scoped>
.error_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error_container_card {
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  border-radius: 20px;
  background-color: aliceblue;
  margin-bottom: 20px;
}
</style>
