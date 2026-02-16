<template>
    <div v-if="product">
      <h1>{{ product.title }}</h1>
      <img :src="product.image" width="200" />
      <p><strong>Preço:</strong> R$ {{ product.price }}</p>
      <p><strong>Categoria:</strong> {{ product.category }}</p>
      <p><strong>Descrição:</strong> {{ product.description }}</p>
  
      <Button label="Voltar" icon="pi pi-arrow-left" @click="$router.back()" />
    </div>
  
    <p v-else>Carregando...</p>
  </template>
  
  <script>
  import axios from 'axios'
  import Button from 'primevue/button'
  
  export default {
    props: ['id'],
  
    components: {
      Button
    },
  
    data() {
      return {
        product: null
      }
    },
  
    async mounted() {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${this.id}`
      )
      this.product = response.data
    }
  }
  </script>
  