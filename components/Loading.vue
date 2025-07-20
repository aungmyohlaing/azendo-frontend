<template>
    <div class="loading-container gap-1 items-center">
        <div class="spinner"></div>
        <span class="loading-text">{{ message || 'Loading...' }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message?: string
}>()
</script>
