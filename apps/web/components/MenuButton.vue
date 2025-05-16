<script setup lang="ts">
defineProps<{
    title: string,
    unread?: boolean
}>()
</script>

<template>
    <button class="button" :class="{ 'unread': unread }">
        <span class="menu-button-icon">
            <slot name="icon"></slot>
        </span>
        <TwelveText class="menu-button-text">{{ title }}</TwelveText>
        <span v-if="unread" class="unread-indicator"></span>
    </button>
</template>

<style scoped>
.button {
    position: relative;
    padding: 14px 10px 10px 10px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: none;
    width: 100%;
    cursor: pointer;
}

.menu-button-icon {
    font-size: 26px;
    color: #333;
}

.menu-button-text {
    color: #333;
    font-weight: 500;
}

.unread-indicator {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 10px;
    height: 10px;
    background-color: #FF4B4B;
    border-radius: 50%;
    z-index: 2;
    animation: pulse 2s infinite;
}

</style>