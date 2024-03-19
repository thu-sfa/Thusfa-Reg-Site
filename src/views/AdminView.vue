<script setup lang="ts">
import { type AllUsersResponse, type Pagination, type User } from "@/models";
import { axiosSymbol } from "@/symbols";
import { watch, reactive, ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import {
    NCard,
    NSpin,
    NDataTable,
    NInput,
    NButton,
    type DataTableColumns,
    useMessage,
} from "naive-ui";
import { computed } from "vue";

const axios = inject(axiosSymbol);
const router = useRouter();

type ValidationStatus = "validating" | "success" | "error";

const validationStatus = ref<ValidationStatus>("validating");

async function queryData(pagination: Pagination): Promise<AllUsersResponse> {
    loading.value = true;
    return axios!
        .get("/get_users", {
            params: pagination,
        })
        .then((res) => {
            loading.value = false;
            return res.data;
        })
        .catch((err) => {
            router.push({
                name: "error",
                query: {
                    code: err.response.status,
                    msg: err.response.data,
                },
            });
            return Promise.reject(err);
        });
}

onMounted(() => {
    // validate role
    if (!axios) {
        throw new Error("axios is not injected");
    }

    axios
        .get("validate_admin_login")
        .then(() => {
            validationStatus.value = "success";
        })
        .catch(() => {
            validationStatus.value = "error";
            // goto url in 1 sec
            setTimeout(() => {
                window.open(import.meta.env.VITE_URL_ADMIN_REDIRECT, "_self");
            }, 1000);
        });
});

const search = ref("");

const users = reactive<User[]>([]);

const usersData = computed(() => {
    // parse user.created_at to readable string
    return users.map((user) => {
        return {
            ...user,
            created_at: user.created_at
                ? /** in timezone UTC+8  */ dayjs
                      .unix(user.created_at)
                      .subtract(8, "hour")
                      .format("YYYY-MM-DD HH:mm:ss")
                : "",
        };
    });
});

const usersDisplay = computed(() => {
    if (search.value === "") {
        return usersData.value;
    }
    return usersData.value.filter((user) => {
        return (
            user.name.includes(search.value) ||
            user.thuid.includes(search.value) ||
            user.department.includes(search.value) ||
            user.qq.includes(search.value) ||
            user.phone.includes(search.value) ||
            user.email.includes(search.value) ||
            user.qq.includes(search.value)
        );
    });
});

const columns: DataTableColumns<User> = [
    {
        title: "姓名",
        key: "name",
    },
    {
        title: "学号",
        key: "thuid",
    },
    {
        title: "学院",
        key: "department",
    },
    {
        title: "QQ",
        key: "qq",
    },
    {
        title: "手机号",
        key: "phone",
    },
    {
        title: "注册时间",
        key: "created_at",
    },
];

const loading = ref(false);

const pagination = reactive({
    page: 1,
    pageSize: 50,
    pageCount: 1,
});

const msg = useMessage();

watch(validationStatus, (newStatus) => {
    if (newStatus === "success") {
        queryData({
            page: 1,
            per_page: pagination.pageSize,
        }).then((res) => {
            users.push(...res.users);
            pagination.pageCount = Math.ceil(res.total / pagination.pageSize);
        });
    }
});

function handlePageChange(current: number) {
    queryData({
        page: current,
        per_page: pagination.pageSize,
    }).then((res) => {
        pagination.page = current
        users.splice(0, users.length, ...res.users);
    });
}

function reloadAdmin() {
    axios
        ?.post("/reload_admin")
        .then(() => {
            msg.success("成功刷新管理员列表");
            // refresh current page
            window.location.reload();
        })
        .catch((err) => {
            msg.error(err.response.data);
        });
}
</script>

<template>
    <div>
        <div class="topbar" v-if="validationStatus === 'success'">
            <p class="count">{{ usersDisplay.length }}</p>
            <div class="actions">
                <div class="search">
                    <n-input
                        v-model:value="search"
                        placeholder="搜索"
                        style="width: 200px; margin: 10px 0 10px 20px"
                    />
                </div>
                <n-button @click="reloadAdmin">{{
                    $t("reload_admin")
                }}</n-button>
            </div>
        </div>
        <n-card v-if="validationStatus !== 'success'">
            <n-spin size="large" style="margin: 20px auto 0 auto" />
            <template #header>
                <h1 v-if="validationStatus === 'validating'">
                    {{ $t("adminview.validating") }}
                </h1>
                <h1 v-else>{{ $t("adminview.redirecting") }}</h1>
            </template>
        </n-card>
        <div v-else class="container">
            <n-data-table
                remote
                :pagination="pagination"
                :loading="loading"
                :columns="columns"
                :data="usersDisplay"
                @update:page="handlePageChange"
            />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.topbar {
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.count {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    text-align: center;
    line-height: 60px;
    padding-left: 50px;
}

.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 50px;
}

.search {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
}
</style>
