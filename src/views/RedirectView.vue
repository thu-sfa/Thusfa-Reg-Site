<script setup lang="ts">
import type { AuthenticatedUser } from "@/models";
import { axiosSymbol } from "@/symbols";
import { inject } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
    code: string
}>();

const router = useRouter();
const axios = inject(axiosSymbol)
if (!axios) {
    throw new Error("Axios not found");
}

const code = props.code;

// send the code to the server
axios.get("/get_user_info", {
    params: {
        code: code
    }
}).then((res) => {
    const user:AuthenticatedUser = res.data;
    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(user));
    // redirect to regview step 2
    router.push({
        name: "reg",
        query: {
            step: 2
        }
    });
}).catch((err) => {
    console.error(err);
    router.push({
        name: "error",
        query: {
            code: err.response.status,
        }
    });
});

</script>

<template>
    <div>
        <h1>{{ $t('redirecting') }}</h1>
    </div>
</template>