import { type Product } from '../../../types/Product';
import api from '@/services/api';
import { ref } from 'vue';

export function useProducts() {
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.get<Product[]>('/products');
            products.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch products. Please try again later.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts
    };
}