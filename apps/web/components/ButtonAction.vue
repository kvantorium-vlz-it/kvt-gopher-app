<script setup lang="ts">
const props = defineProps({
    disabled: {
    default: false
  },

})

</script>

<template>
  
    <button class="button" :disabled="props.disabled">
      <TwentyText class="button-action-text"><slot>вперёд!</slot></TwentyText>
    </button>
  
</template>

<style scoped>


.button {
  padding: 12px 48px;
  border-radius: 8px;
  background-color: rgba(71, 125, 255, 1);
  display: inline-flex;
  justify-content: center;
  border: none;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(60, 105, 255, 0.2);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(60, 105, 255, 0.3);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(60, 105, 255, 0.2);
}

.button-action-text {
  color: #FFFFFF;
  font-size: 1.1rem;
  font-weight: 500;
}
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>