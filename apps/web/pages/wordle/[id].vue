<template>
    <div class="game-wrapper">
      <div class="setup-container" v-if="!gameStarted">
        <input 
          v-model="word" 
          type="text" 
          placeholder="Enter a word"
          class="word-input"
          :disabled="gameStarted"
        >
        <button 
          @click="startGame" 
          class="start-button"
          :disabled="!word || gameStarted"
        >
          Start Game
        </button>
      </div>
      <WordleGame v-if="gameStarted" :word="word" @game-over="gameStarted = false" />
    </div>
  </template>
  
  <script setup>
  const word = ref('')
  const gameStarted = ref(false)
  
  const startGame = () => {
    if (word.value) {
      gameStarted.value = true
    }
  }
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
    transition: all 0.2s ease;
  }
  
  .word-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  .start-button {
    padding: 0.5rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 0.5rem;
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }
  
  .start-button:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  .start-button:focus {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }
  
  .start-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>