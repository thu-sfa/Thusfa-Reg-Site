<script setup lang="ts">
import { axiosSymbol } from "@/symbols";
import { inject } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  code: string;
}>();

const axios = inject(axiosSymbol);
const router = useRouter();

axios
  ?.post("/admin_login", {
    code: props.code,
  })
  .then((res) => {
    localStorage.setItem("admin", JSON.stringify(res.data));
    router.push({
      name: "admin",
    });
  })
  .catch((err) => {
    console.error(err);
    router.push({
      name: "error",
      query: {
        code: err.response.status,
      },
    });
  });
</script>

<template>
  <h1>{{ $t("redirecting") }}</h1>
</template>
