<template>
  <div class="d-flex justify-content-end gap-2 mb-6">
  </div>


  <div class="products">
    <h1>Lista de Produtos</h1>
    <Search @search="Search"/>

    <p v-if="loading">Carregando produtos...</p>
    <table v-else>
      <thead>
        <tr class="header">
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Descrição</th>
          <th>Imagem</th>
          <th>Ver Detalhes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>R$ {{ product.price }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img 
            v-if="product.image" 
            :src="product.image" 
            alt="Imagem do produto" 
            width="100"
            />
            <span v-else>Sem imagem</span>
          </td>
          <td> <Button label="Search" icon="pi pi-search"  @click="goToDetails(product.id)"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Search from '../../components/Search.vue';
import Button from 'primevue/button';

export default {
  name: 'ProductsList',


  components: {
    Search,
    Button
  },

  data() {
    return {
      products: [],
      loading: true,
      error:null,
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {

  Search(searched) {
    if(searched === '') {
      this.getProducts()
      return
    }
    this.products = this.products.filter(product => 
      product.title.toLowerCase().includes(searched.toLowerCase())
    )
  },

  goToDetails(id) {
  this.$router.push(`/products/${id}`)
  },

    async getProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        this.products = response.data
      } catch (error) {
        console.error(error)
        alert('Erro ao carregar produtos')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>


</style>
