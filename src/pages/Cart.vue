<script setup lang="ts">
    import ConfirmModal from '@/components/ConfirmModal.vue';
import { useCartStore } from '@/stores/cart';
import { ShoppingCart } from 'lucide-vue-next';
    import { ref } from 'vue';

    const cartStore = useCartStore();
    const isClearModalOpen = ref(false);

    function clearCart(){
        cartStore.clearCart();
        isClearModalOpen.value = true;
    }
</script>
<template>
    <main class="container mx-auto px-4 mx:px-8 min-h-screen">
        <div class="flex flex-col lg:flex-row gap-10 items-start">
            <h1 class="text-3xl font-black">
                Meu Carrinho
            </h1>
            <div v-if="cartStore.cartItems.length === 0" class="card bg-base-100 shadow-xl py-20">
                <div class="card-body items-center text-center">
                    <div class="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center">
                        <ShoppingCart class="h-12 w-12"/>
                    </div>
                    <h2 class="card-title text-2xl">Seu carrinho está vazio</h2>
                    <p class="opacity-60">Você ainda não adicionou itens no carrinho</p>
                    <div class="card-actions">
                        <RouterLink to="/" class="btn btn-primary">Voltar para a loja</RouterLink>
                    </div>
                </div>

            </div>

            <div v-else class="flex flex-col gap-6 w-full">
                <div class="flex flex-col gap-4">
                    <CartItem v-for="item in cartStore.cartItems" :key="item.id" :item="item"/>
                </div>
                <div class="flex justify-end items-center gap-6">
                    <div class="text-lg font-bold">
                        Total: R$ {{ cartStore.CartTotal.toFixed(2) }}
                    </div>
                    <button @click="clearCart" class="btn btn-error">Limpar Carrinho</button>
                </div>

        </div>
        </div>
        <ConfirmModal
        :open="isClearModalOpen"
        title="Carrinho Limpo"
        message="Todos os itens foram removidos do carrinho."
        confirmText="OK"
        @confirm="isClearModalOpen = false"
        @cancel="isClearModalOpen = false"
        />
    </main>
</template>