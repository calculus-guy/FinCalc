export const BASE_URL = 'http://localhost:8080'

export const API_PATHS = {
    AUTH:{
        LOGIN: "/api/v1/auth/login",
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser'
    },
    DASHBOARD:{
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME:{
        ADD_INCOME: "/api/v1/income/add",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        GET_ALL_INCOME: "/api/v1/income/GET",
        DOWNLOAD_INCOME: "/api/v1/income/downloadExcel"
    },
    EXPENSE:{
        ADD_EXPENSE: "/api/v1/expense/add",
        DELETE_EXPENSE: (expenseId) =>`/api/v1/expense/${expenseId}`,
        GET_ALL_EXPENSE: "/api/v1/expense/GET",
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadExcel"
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/v1/auth/upload-image"
    },
}