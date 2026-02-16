<template>
    <InputText v-model="searched" placeholder="Pesquisar..."/>
    <Button label="Pesquisar" @click="search"></Button>>
</template>

<script setup>
    
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { ref } from 'vue'

const searched = ref('')
const emi = defineEmits(['search']);

function search() {
    emi('search', searched.value)
}

</script>