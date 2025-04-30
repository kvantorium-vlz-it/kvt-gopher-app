<script setup lang="ts">
</script>
<template>
    <div class="block">
        <slot></slot>
    </div>
</template>
<style scoped>

.block{
    padding: 20px;
    isolation: isolate;
    overflow: hidden;
    border-radius: 16px;
}
</style>