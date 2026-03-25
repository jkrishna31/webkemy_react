import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { contentTypes } from "@/constants/api.const";

const axiosInstance = axios.create();

const axiosReqFulfilledInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!config.baseURL) {
    config.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = contentTypes.JSON;
  }
  return config;
};

const axiosReqRejectedInterceptor = (error: any) => {
  // if error.request, error.response, otherwise axios error
  return Promise.reject(error);
};

const axiosResFulfilledInterceptor = (response: AxiosResponse) => {
  return response;
};

const axiosResRejectedInterceptor = (error: any) => {
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(axiosReqFulfilledInterceptor, axiosReqRejectedInterceptor);
axiosInstance.interceptors.response.use(axiosResFulfilledInterceptor, axiosResRejectedInterceptor);

export default axiosInstance;
