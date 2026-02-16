<script lang="ts" setup>
    import { CartItem } from '@/types/CartItem';
    import { useCartStore } from '@/stores/cart';
    import { ref } from 'vue';
    import { Minus, Plus, Trash2 } from 'lucide-vue-next';
    import ConfirmModal from '../components/ConfirmModal.vue';

    interface CartItemProps{
        item: CartItem
    }

    const props = defineProps<CartItemProps>();
    const cartStore = useCartStore();
    const isModalOpen = ref(false); 

    function handleDecrement(){
        if(props.item.quantity === 1){
            isModalOpen.value = true;
        } else {
            cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
        }
    }

    function handleRemove(){
        isModalOpen.value = true;
    }

    function confirmRemoval(){
        cartStore.removeFromCart(props.item.id);
        isModalOpen.value = false;
    }
</script>
<template>
    <div class="flex items-center gap-4 bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
        <div class="w-20 h-20 bg-white rounded-lg shrink-0 p-2 border border-base-200">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-contain"/>

        </div>
        <div class="flex-1 min-w-0">
            <h3>{{ item.title }}</h3>
            <p>R$ {{ item.price.toFixed(2) }}</p>

            <div class="flex items-center gap-2 mt-2">
                <div class="join border border-base-300">
                    <button @click="handleDecrement" class="btn btn-xs join-item">
                        <Minus class="h-3 w-3"/>
                    </button>
                    <span class="btn btn-xs join-item pointer-events-none">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
                        <Plus class="h-3 w-3"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-end gap-2">
            <p class="font-bold whitespace-nowrap">R$ {{( item.price * item.quantity).toFixed(2) }}</p>
            <button @click="handleRemove" class="btn btn-ghost btn-xs text-error p-0 hover:bg-transparent">
                <Trash2 class="h-4 w-4"/>
            </button>
        </div>
        <ConfirmModal
        :open="isModalOpen"
        message="Tem certeza que deseja remover o item do carrinho?"
        title="Remover Produto"
        confirmText="Remover"
        @confirm="confirmRemoval"
        @cancel="isModalOpen = false"
        />
    </div>
</template>