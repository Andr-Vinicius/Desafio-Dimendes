<template>
    <div class="card-body text-center p-10" v-if="product">
      <h1 class="text-2xl font-sans">{{ product.title }}</h1>
      <div class="mx-auto">
        <img class="bg-white p-6 rounded-2xl shadow-md flex justify-center h-72 object-contain" :src="product.image" width="200" />

      </div>
      <div class="mt-6 w-full max-w-md mx-auto text-left space-y-2">
        <p><strong>Preço:</strong> R$ {{ product.price }}</p>
        <p><strong>Categoria:</strong> {{ product.category }}</p>
        <p><strong>Descrição:</strong> {{ product.description }}</p>
      </div>

      <div class="card-actions flex justify-center mt-4">
        <button class="btn btn-primary active:scale-95 transition-transform" @click="$router.back()">Voltar</button>
      </div>
    </div>
  
    <p v-else>Carregando...</p>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  
  interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
  }
  
  const props = defineProps<{
    id: number
  }>()
  
  const product = ref<Product | null>(null)
  
  onMounted(async () => {
    try {
      const response = await axios.get<Product>(
        `https://fakestoreapi.com/products/${props.id}`
      )
      product.value = response.data
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
    }
  })
  </script>
  