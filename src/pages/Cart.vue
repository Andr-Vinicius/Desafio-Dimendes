<script setup lang="ts">
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useCartStore } from "@/stores/cart";
import { ShoppingCart } from "lucide-vue-next";
import CartItem from "@/components/CartItem.vue";
import { ref } from "vue";

const cartStore = useCartStore();
const isClearModalOpen = ref(false);

function clearCart() {
  cartStore.clearCart();
  isClearModalOpen.value = true;
}

</script>
<template>
  <main class="min-h-screen bg-base-200 py-10">
    <div class="max-w-6xl mx-auto px-4">

      <div class="mb-10">
        <h1 class="text-4xl font-extrabold tracking-tight">Meu Carrinho</h1>
        <p class="text-sm opacity-60 mt-1">
          Revise seus produtos antes de finalizar a compra
        </p>
      </div>

      <div
        v-if="cartStore.cartItems.length === 0"
        class="card bg-base-100 shadow-2xl border border-base-300"
      >
        <div class="card-body items-center text-center py-20">
          <div
            class="w-28 h-28 bg-base-200 rounded-full flex items-center justify-center mb-6 shadow-inner"
          >
            <ShoppingCart class="h-14 w-14 opacity-70" />
          </div>

          <h2 class="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>

          <p class="opacity-60 mb-6">
            Você ainda não adicionou itens no carrinho
          </p>

          <RouterLink to="/" class="btn btn-primary px-8">
            Voltar para a loja
          </RouterLink>
        </div>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 flex flex-col gap-4">
          <CartItem
            v-for="item in cartStore.cartItems"
            :key="item.id"
            :item="item"
          />
        </div>

        <div class="card bg-base-100 shadow-xl h-fit sticky top-10">
          <div class="card-body">
            <h2 class="text-xl font-bold mb-4">Resumo do Pedido</h2>

            <div class="flex justify-between mb-2">
              <span>Itens</span>
              <span>{{ cartStore.cartItems.length }}</span>
            </div>

            <div class="divider"></div>

            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span class="text-primary">
                R$ {{ cartStore.CartTotal.toFixed(2) }}
              </span>
            </div>

            <button @click="clearCart" class="btn btn-error mt-6 w-full">
              Limpar Carrinho
            </button>
          </div>
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
