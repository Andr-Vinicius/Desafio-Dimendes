<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const searched = ref('')

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

function handleSearch() {
  emit('search', searched.value)
}

function handleEnter() {
  emit('search', searched.value)
}
</script>

<template>
  <div class="w-full flex justify-center mt-6 mb-8 px-4">
    <div class="flex w-full max-w-2xl rounded-2xl bg-slate-800 shadow-lg overflow-hidden py-3 px-4">

      <InputText
        v-model="searched"
        placeholder="Pesquisar produtos..."
        class="flex-1 bg-transparent text-white placeholder-gray-400 border-none focus:outline-none px-5 py-3"
        @keyup.enter="handleEnter"
      />
      <Button
        label="Buscar"
        icon="pi pi-search"
        class="rounded-none bg-blue-600 hover:bg-blue-700 border-none px-6"
        @click="handleSearch"
      />
    </div>
  </div>
</template>
