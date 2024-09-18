import type { AxiosInstance } from "axios";
import type { InjectionKey } from "vue";

export const axiosSymbol: InjectionKey<AxiosInstance> = Symbol("axios");
