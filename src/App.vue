<script setup lang="ts">
import Navbar from '../src/components/Navbar.vue';

</script>

<template>

  <div class="min-h-dvh bg-base-200 font-sans text-base-content antialiased">
    <Navbar/>
    <router-view />
  </div>
</template>
