<script setup lang="ts">
defineProps<{
    title: string,
}>()
</script>
<template>
    <button class="button">
        <span class="menu-button-icon">
            <slot name="icon"></slot>
        </span>
        <TwelveText class="menu-button-text">{{ title }}</TwelveText>
    </button>
</template>
<style scoped>

.button{
    padding: 14px 10px 10px 10px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border:none;
    width: 100%;
}

.menu-button-icon{
    font-size: 26px;
}

</style>