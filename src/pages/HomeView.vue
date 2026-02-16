<script setup lang="ts">
import Product from "@/components/Product.vue";
import ProductCard from "@/components/ProductCard.vue";
import SearchComponent from "../components/Search.vue";
import { useProducts } from "@/composables/api/products/useProducts";
import { onMounted, ref, computed } from "vue";

let { products, loading, error, fetchProducts } = useProducts();

const selectedCategory = ref("all");
const sortOption = ref("");
const searchTerm = ref("");

function Search(searched: string) {
  searchTerm.value = searched;
}

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (searchTerm.value) {
    result = result.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }

  if (selectedCategory.value !== "all") {
    result = result.filter((p) => p.category === selectedCategory.value);
  }

  if (sortOption.value === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortOption.value === "rating") {
    result.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return result;
});

const categories = computed(() => {
  const cats = products.value.map((p) => p.category);
  return ["all", ...Array.from(new Set(cats))];
});

onMounted(() => {
  fetchProducts();
});
</script>
<template>
  <main class="container mx-auto px-4 md:px-8 py-8 min-h-screen">
    <header class="mb-10 text-center space-y-2">
      <h1 class="text-2xl">Explore nossos produtos</h1>
    </header>
    <SearchComponent @search="Search" />
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div>
        <label for="category" class="mr-2 font-semibold">Categoria:</label>
        <select
          id="category"
          v-model="selectedCategory"
          class="border rounded px-2 py-1 bg-slate-800"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <div>
        <label for="sort" class="mr-2 font-semibold">Ordenar por:</label>
        <select id="sort" v-model="sortOption" class="border rounded px-2 py-1 bg-slate-800">
          <option value="">Padrão</option>
          <option value="price-asc">Preço: menor para maior</option>
          <option value="price-desc">Preço: maior para menor</option>
          <option value="rating">Avaliação</option>
        </select>
      </div>
    </div>

    <div v-if="error">
      <div>
        <h2>Erro</h2>
        <span>{{ error }}</span>
        <button @click="fetchProducts">Tentar Novamente</button>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
    >
      <template v-if="loading">
        <Product v-for="i in 8" :key="i" />
      </template>
      <template v-else>
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
      </template>
    </div>
  </main>
</template>
