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
.button {
    padding: 14px 10px 10px 10px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border: none;
    width: 100%;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.button:hover {
    background-color: #E5E5E5;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.menu-button-icon {
    font-size: 26px;
    color: #333;
}

.menu-button-text {
    color: #333;
    font-weight: 500;
}
</style>