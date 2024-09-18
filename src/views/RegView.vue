<script setup lang="ts">
import {
  createUserFromAuthenticatedUser,
  type AuthenticatedUser,
  type User,
} from "@/models";
import router from "@/router";
import { axiosSymbol } from "@/symbols";
import {
  NSteps,
  NStep,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCard,
  type FormRules,
  type FormInst,
} from "naive-ui";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import qrcode from "@/assets/qrcode.jpg";

const props = defineProps<{
  step: number;
  existed?: boolean;
}>();

const currentStep = ref(props.step);

const i18n = useI18n();

const axios = inject(axiosSymbol);

const registering = ref(false);

const formRef = ref<FormInst | undefined>(undefined);

if (!axios) {
  throw new Error("Axios not found");
}

const formValidationRules: FormRules = {
  phone: {
    required: true,
    message: i18n.t("regview.phone_required"),
    trigger: ["blur", "change"],
  },
  department: {
    required: true,
    message: i18n.t("regview.department_required"),
    trigger: ["blur", "change"],
  },
  qq: {
    required: true,
    message: i18n.t("regview.qq_required"),
    trigger: ["blur", "change"],
  },
};

const authenticatedUser: AuthenticatedUser = JSON.parse(
  localStorage.getItem("user") || "{}",
);

if (currentStep.value !== 3 && authenticatedUser.thuid === undefined) {
  currentStep.value = 1;
}

const user = ref<User>(createUserFromAuthenticatedUser(authenticatedUser));

async function submitForm() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      register();
    }
  });
}

function register() {
  registering.value = true;

  axios!
    .post("/register", {
      phone: user.value.phone,
      department: user.value.department,
      qq: user.value.qq,
    })
    .then(() => {
      router.push({
        name: "reg",
        query: {
          step: 3,
        },
      });
    })
    .catch((err) => {
      // if err is User already exists
      // redirect to regview step 3 with existed: true
      if (err.response.status === 460) {
        router.push({
          name: "reg",
          query: {
            step: 3,
            existed: "true",
          },
        });
      } else {
        router.push({
          name: "error",
          query: {
            code: err.response.status,
            msg: err.response.data,
          },
        });
      }
    })
    .finally(() => {
      registering.value = false;
      localStorage.removeItem("user");
    });
}

function gotoGitlab() {
  window.open(import.meta.env.VITE_URL_REG_REDIRECT, "_self");
}
</script>

<template>
  <div class="container">
    <n-card class="card container">
      <template #header>
        <div class="header">
          <n-steps :current="currentStep" status="process">
            <n-step :title="$t('regview.authenticate')" />
            <n-step :title="$t('regview.register')" />
            <n-step :title="$t('regview.complete')" />
          </n-steps>
        </div>
      </template>
      <div class="content">
        <div v-if="currentStep === 1" class="content_container">
          <i18n-t keypath="regview.authenticate_hint" tag="p">
            <template #link>
              <a href="https://git.tsinghua.edu.cn" target="_blank">
                {{ $t("regview.tsinghua_git") }}
              </a>
            </template>
          </i18n-t>
          <div style="height: 20px"></div>
          <n-button size="large" type="primary" @click="gotoGitlab">
            {{ $t("regview.authenticate") }}
          </n-button>
        </div>

        <div v-if="currentStep === 2" class="content_container">
          <p class="hint">{{ $t("regview.information_hint") }}</p>
          <div style="height: 10px" />
          <n-form
            label-placement="left"
            :model="user"
            :rules="formValidationRules"
            ref="formRef"
          >
            <n-form-item
              :label="$t('regview.label.name')"
              path="name"
              label-placement="left"
            >
              <n-input disabled :value="user.name" />
            </n-form-item>
            <n-form-item
              :label="$t('regview.label.email')"
              path="email"
              label-placement="left"
            >
              <n-input disabled :value="user.email" />
            </n-form-item>
            <n-form-item
              :label="$t('regview.label.stuid')"
              path="thuid"
              label-placement="left"
            >
              <n-input disabled :value="user.thuid" />
            </n-form-item>
            <n-form-item
              :label="$t('regview.label.phone')"
              path="phone"
              :required="true"
            >
              <n-input
                v-model:value="user.phone"
                :allow-input="
                  (input) => {
                    return /^[0-9]*$/.test(input);
                  }
                "
              />
            </n-form-item>
            <n-form-item
              :label="$t('regview.label.department')"
              path="department"
              :required="true"
            >
              <n-input v-model:value="user.department" />
            </n-form-item>
            <n-form-item
              :label="$t('regview.label.qq')"
              path="qq"
              :required="true"
            >
              <n-input
                v-model:value="user.qq"
                :allow-input="
                  (input) => {
                    return /^[0-9]*$/.test(input);
                  }
                "
              />
            </n-form-item>
            <n-form-item>
              <n-button
                :loading="registering"
                :disabled="registering"
                size="large"
                type="primary"
                @click="submitForm"
                circle
                class="submit_btn"
              >
                {{ $t("regview.submit") }}
              </n-button>
            </n-form-item>
          </n-form>
        </div>

        <div class="container_3" v-if="currentStep == 3">
          <div class="3_hint" v-if="existed">
            <h1>{{ $t("regview.registered_already") }}</h1>
          </div>
          <div class="3_hint" v-else>
            <h1>{{ $t("regview.registered_success") }}</h1>
          </div>
          <p style="margin-bottom: 10px">{{ $t("regview.scan_qrcode") }}</p>
          <a
            target="_blank"
            href="https://qm.qq.com/cgi-bin/qm/qr?k=cPGWRPjfcpXVSfBdxSL8623nHml2z-MY&jump_from=webapi&authKey=zVOdwDPrusV0CT8DMVp5NZS1FcXL24I8i00REBc6XiMC5HwkSqBVZZ28MQ9L0u9i"
            ><img
              border="0"
              src="//pub.idqqimg.com/wpa/images/group.png"
              alt="大清幻协再次生产"
              title="大清幻协再次生产"
          /></a>
          <img :src="qrcode" class="qrcode" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
.container {
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.card {
  max-width: 500px;
  min-width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  border-radius: 20px;
  background-color: aliceblue;
}

.header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;
}

.hint {
  max-width: 300px;
  font-size: small;
  color: gray;
}

.content_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.submit_btn {
  width: 100%;
}

.container_3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qrcode {
  width: 200px;
  margin: 0 auto;
}
</style>
