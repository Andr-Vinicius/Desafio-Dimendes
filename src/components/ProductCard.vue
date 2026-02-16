<script setup lang="ts">
import { Product } from '@/types/Product';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

    interface ProductCardProps{
        product: Product
    }

    defineProps<ProductCardProps>();

    const cartStore = useCartStore();
    const router = useRouter();

    interface StarRatingFunction {
        (rate: number): number;
    }

    const getStarRanting: StarRatingFunction = function(rate: number): number {
        return Math.round(rate * 2);
    };

    function goToDetails(id: any) {
        router.push(`/products/${id}`)
    }

</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
        <figure class="px-6 pt-6 bg-white overflow-hidden h-64">
            <img
            :src="product.image"
            :alt="product.title"
            class="rounded-xl h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            
        </figure>

        <div class="card-body">
            <div class="flex flex-col gap-1 h-32">
                <h2 class="card-title text-sm line-clamp-2">{{ product.title }}</h2>
                <div class="flex items-center gap-2 mt-auto">
                    <div class="rating rating-xs rating-half rating-readonly">
                        <input type="radio" class="rating-hidden"/>
                        <template v-for="i in 10" :key="i">
                            <input type="radio" class="mask mask-star-2"
                            :class="i % 2 === 0 ? 'mask-half-2 bg-amber-400': 'mask-half-1 bg-amber-400'"
                            :checked="i === getStarRanting(product.rating.rate)"
                            />
                        </template>
                    </div>
                    <span class="text-cs opacity-60 ml-1">{{ product.rating.rate.toFixed(1) }}</span>
                    <span class="text-xs opacity-60">{{ product.rating.count }}</span>
                </div>
                <p class="text-xl font-bold text-primary">R$ {{ product.price.toFixed(2) }}</p>
            </div>

            <div class="card-actions mt-4">
                <button label="Search" class="btn btn-primary btn-block active:scale-95 transition-transform" @click="goToDetails(product.id)">Exibir</button>
                <button 
                @click="cartStore.addToCart({ ...product, quantity: 1 })" 
                class="btn btn-primary btn-block active:scale-95 transition-transform">
                Adicionar ao Carrinho
            </button>
            </div>

        </div>

    </div>
</template>