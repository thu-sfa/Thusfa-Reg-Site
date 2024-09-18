<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from "vue";
import type { Problem } from "@/models";
import { NThing, NRadioGroup, NRadio, NButton, NDivider } from "naive-ui";
import { axiosSymbol } from "@/symbols";

const problems: Problem[] = reactive([]);

const axios = inject(axiosSymbol)!;

onMounted(() => {
  axios.get("/quiz").then((res) => {
    problems.push(...res.data);
  });
});

const submitted = ref(false);

const selected = reactive<number[]>(Array(10).fill(-1));

const point = ref(0);

const loading = ref(false);

function calculatePoints() {
  point.value = 0;
  loading.value = true;

  axios
    .post<string>("/uquiz", selected)
    .then((res) => {
      point.value = parseInt(res.data);
      submitted.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div>
    <n-thing class="container" v-for="(problem, index) in problems">
      <template #avatar>
        <span class="index">{{ index + 1 }}</span>
      </template>
      <template #header>
        <span class="question">{{ problem.question }}</span>
      </template>

      <div>
        <n-radio-group
          :value="selected[index]"
          :disabled="submitted"
          @update:value="(val: number) => (selected[index] = val)"
        >
          <n-radio
            v-for="(option, oIndex) in problem.options"
            class="option"
            :key="oIndex"
            :value="oIndex"
          >
            {{ option }}
          </n-radio>
        </n-radio-group>
      </div>
    </n-thing>

    <n-button
      :loading="loading"
      v-if="!submitted"
      type="primary"
      class="submit_btn"
      @click="calculatePoints"
      >提交</n-button
    >

    <div v-if="submitted" class="ret">
      <n-divider />
      <p class="hint">你的得分</p>
      <p>
        <span class="grade">{{ point }}</span
        >/100
      </p>
      <a class="gotoreg" href="/">加入我们 -></a>
    </div>
  </div>
</template>

<style scoped>
.container {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: aliceblue;
  margin-top: 10px;
  padding: 10px 20px;
}

.index {
  font-size: 1.5rem;
  font-weight: bold;
}

.question {
  font-size: 1rem;
}

.option {
  font-size: 1rem;
}

.submit_btn {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.ret {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.hint {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.grade {
  font-size: 2rem;
  font-weight: bold;
  color: #f00;
}

.gotoreg {
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
