import { type CartItem } from "@/types/CartItem";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const CART_STORAGE_KEY = 'vueshop_cart';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartItem[]>(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'));  

    watch(cartItems, (newCartItems) => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartItems));
    }, { deep: true });

    const CartCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    const CartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    function addToCart(product: CartItem) {
        const existingItem = cartItems.value.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        }   else {              
            cartItems.value.push(product);
        }
    }

    function removeFromCart(productId: number) {
        cartItems.value = cartItems.value.filter(item => item.id !== productId);
    }   

    function updateQuantity(productId: number, quantity: number) {
        const item = cartItems.value.find(item => item.id === productId);   
        if (item) {
            if(quantity <= 0){
                removeFromCart(productId);
            }else{
                item.quantity = quantity;
            }
        }   

    }

    function clearCart() {
        cartItems.value = [];
    }

    return{
        cartItems,
        CartCount,
        CartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }

})