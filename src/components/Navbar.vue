<script setup lang="ts">
    import { useCartStore } from '@/stores/cart';
    import { ShoppingCart } from 'lucide-vue-next';


    const cartStore = useCartStore();


</script>
<template>
    <div class="navbar bg-indigo-700 text-white shadow-md sticky top-0 z-50 px-4 md:px-8">

<!-- ESQUERDA -->
<div class="navbar-start">
  <RouterLink to="/" class="btn btn-ghost text-xl">
    Início
  </RouterLink>
</div>

<!-- DIREITA -->
<div class="navbar-end">
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <ShoppingCart class="h-5 w-5" />

        <span 
          v-if="cartStore.CartCount > 0"
          class="badge badge-sm bg-indigo-500 text-white indicator-item"
        >
          {{ cartStore.CartCount }}
        </span>
      </div>
    </div>

    <div class="card card-compact dropdown-content bg-slate-800 text-white mt-3 w-60 shadow-xl rounded-xl">
      <div class="card-body">
        <span class="font-semibold">
          {{ cartStore.CartCount }} itens
        </span>

        <span class="text-indigo-400">
          Subtotal R$ {{ cartStore.CartTotal.toFixed(2) }}
        </span>

        <div class="card-actions mt-2">
          <RouterLink 
            to="/cart" 
            class="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full"
          >
            Ver Carrinho
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</div>

</div>

</template>