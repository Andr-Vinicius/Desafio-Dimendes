<script setup lang="ts">
    import Product from '@/components/Product.vue';
    import ProductCard from '@/components/ProductCard.vue';
    import Search from '../components/Search.vue';
    import { useProducts } from '@/composables/api/products/useProducts';
    import { onMounted } from 'vue';


    const {products, loading, error, fetchProducts} = useProducts();

    onMounted(() => {
        fetchProducts();
    });



    /*function Search(searched: string) {
        if (searched === '') {
            fetchProducts();
            return;
        }
        
    }*/
</script>
<template>
    <main class="container mx-auto px-4 md:px-8 py-8 min-h-screen">
        <header class="mb-10 text-center space-y-2">
            <h1>Explore nossos produtos</h1>
            <p>Produtos com qualidade.</p>
        </header>

        <div v-if="error">
            <div>
                <h2>Erro</h2>
                <span>{{ error }}</span>
                <button @click="fetchProducts">Tentar Novamente</button>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <template v-if="loading">
                <Product v-for="i in 8" :key="i"/>
            </template>
            <template v-else>
                <ProductCard v-for="p in products" :key="p.id" :product="p"/>
            </template>
        </div>
    </main>
</template>