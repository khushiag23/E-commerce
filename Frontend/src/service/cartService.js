import { apiCall } from "../utils/apiCall";
import { HTTP_METHODS } from "../utils/constant";
import { ENDPOINTS } from "../utils/endpoint";

export const cartService = {
    getCart: async () => {
        const res = await apiCall(ENDPOINTS.CART, HTTP_METHODS.GET);
        return res;
    },
    addToCart: async (productId, quantity) => {
        const res = await apiCall(ENDPOINTS.CART, HTTP_METHODS.POST, { productId, quantity });
        return res;
    },
    updateCart: async (productId, quantity) => {
        const res = await apiCall(ENDPOINTS.CART, HTTP_METHODS.PUT, { productId, quantity });
        return res;
    },
    removeItem: async (cartId) => {
        const res = await apiCall(`${ENDPOINTS.CART}/${cartId}`, HTTP_METHODS.DELETE);
        return res;
    }
}