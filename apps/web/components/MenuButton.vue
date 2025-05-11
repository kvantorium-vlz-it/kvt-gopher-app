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
    position: relative;
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

@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 75, 75, 0.7);
    }
    
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 8px rgba(255, 75, 75, 0);
    }
    
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 75, 75, 0);
    }
}
</style>