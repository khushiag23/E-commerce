import { apiCall } from "../utils/apiCall";
import { HTTP_METHODS } from "../utils/constant";
import { ENDPOINTS } from "../utils/endpoint";

export const productService = {
    getAllProducts: async () => {
        const res = await apiCall(ENDPOINTS.PRODUCTS, HTTP_METHODS.GET);
        return res.data;
    },
    getProductById: async (id) => {
        const res = await apiCall(`${ENDPOINTS.PRODUCTS}/${id}`, HTTP_METHODS.GET);
        return res.data;
    },
    getCategories: async () => {
       const res = await apiCall(ENDPOINTS.PRODUCT_CATEGORIES, HTTP_METHODS.GET)
       console.log(res , "res from get categories");
       return res.data.categories;
    },
    getFilteredProducts: async (params) => {
        const res = await apiCall(`${ENDPOINTS.PRODUCTS}?${params}`, HTTP_METHODS.GET);
        return res.data;
    }
}