<template>
    <div class="game-wrapper">
      <div class="setup-container" v-if="gameStarted">
    
        <button v-if="gameStarted"
          @click="emit('gameOver')" 
          class="start-button"
        >
          Дальше
        </button>
      </div>
      <WordleGame :word="word" @game-over="gameStarted = true" />
    </div>
  </template>
  
  <script setup lang="ts">
const emit = defineEmits(['gameOver'])
const props = defineProps<{
    word: string
  }>()

  const word = ref(props.word)
  const gameStarted = ref(false)
  
  // const startGame = () => {
  //   if (word.value) {
  //     gameStarted.value = true
  //   }
  // }
  </script>
  
  <style>
  .game-wrapper {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  }
  
  .setup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
  }
  
  .word-input {
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    width: 16rem;
    outline: none;
  }
  
  .word-input:focus {
    border-color: #3b82f6;
  }
  
  .start-button {
    padding: 0.5rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 0.5rem;
    font-weight: 600;
  }
  
  .start-button:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  .start-button:focus {
  }
  
  .start-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>