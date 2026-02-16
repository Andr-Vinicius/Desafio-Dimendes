<script setup lang="ts">
    import { useCartStore } from '@/stores/cart';
    import { ShoppingCart } from 'lucide-vue-next';


    const cartStore = useCartStore();


</script>
<template>
    <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8">
        <div class="flex-none gap-2">
            <RouterLink to="/" class="btn btn-ghost normal-case text-xl">Inicio</RouterLink>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <ShoppingCart class="h-5 w-5"/>
                        <span v-if="cartStore.CartCount > 0" class="badge badge-sm badge-primary indicator-item animate-bounce">
                            {{ cartStore.CartCount }}
                        </span>
                    </div>
                </div>
                <div class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                    <div class="card-body">
                        <span class="text-lg font-bold">{{ cartStore.CartCount }}</span>
                        <span class="text-info">Subtotal R$ {{ cartStore.CartTotal.toFixed(2) }}</span>
                        <div class="card-actions">
                            <RouterLink to="/cart" class="btn btn-primary btn-block">Ver Carrinho</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>