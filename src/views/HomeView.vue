<script setup lang="ts">
import { NButton, NCard } from "naive-ui";
</script>

<template>
  <main>
    <n-card class="card" :title="$t('title')">
      <p class="content">{{ $t("welcome") }}</p>
      <n-button
        class="btn"
        type="primary"
        round
        @click="$router.push({ name: 'reg' })"
        >{{ $t("register") }}</n-button
      >
    </n-card>
  </main>
</template>

<style scoped>
.card {
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  border-radius: 20px;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
}

.btn {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
