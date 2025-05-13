<script setup lang="ts">
const props = defineProps<{
  word: string
}>()

const emit = defineEmits(['gameOver'])

const state = reactive({
  guesses: [] as string[],
  currentGuess: '',
  gameOver: false,
  won: false,
  maxAttempts: 6,
})

const submitGuess = () => {
  if (state.currentGuess.length !== props.word.length) return
  
  state.guesses.push(state.currentGuess)
  
  if (state.currentGuess === props.word) {
    state.won = true
    setTimeout(() => {
      state.gameOver = true
      
    }, 1500)
    setTimeout(() => {emit('gameOver')}, 1500)
    
  } else if (state.guesses.length >= state.maxAttempts) {
    setTimeout(() => {
    state.gameOver = true
      }, 1500)
    // emit('gameOver')
  }
  
  state.currentGuess = ''
}

const getLetterClass = (letter: string, index: number, guess: string) => {
  if (props.word[index] === ' ') {
    return 'space'
  }
  if (letter === props.word[index]) {
    return 'correct'
  } else if (props.word.includes(letter)) {
    return 'present'
  }
  return 'absent'
}
</script>

<template>
  <div class="game-container">
    <TwentyText class="game-title">Wordle</TwentyText>
    
    <div class="grid">
      <div v-for="(guess, i) in state.guesses" :key="i" class="guess-row">
        <div
          v-for="(letter, j) in guess.split('')"
          :key="j"
          class="letter-tile"
          :class="[
            getLetterClass(letter, j, guess), 
            `delay-${j}`, 
          ]"
        >
          {{ letter.toUpperCase() }}
        </div>
      </div>
      
      <div
        v-for="i in (state.maxAttempts - state.guesses.length)"
        :key="i"
        class="guess-row"
      >
        <div
          v-for="j in props.word.length"
          :key="j"
          class="letter-tile empty"
          :class="{ 'space': props.word[j-1] === ' ' }"
        >
          {{ props.word[j-1] === ' ' ? '␣' : '' }}
        </div>
      </div>
    </div>
    
    <div v-if="state.gameOver" class="game-message">
      <TwentyText v-if="state.won">Поздравляю! Вы победили! 🎉</TwentyText>
      <TwentyText v-else>Игра окончена! Слово было: {{ props.word.toUpperCase() }}</TwentyText>
    </div>

    <div v-if="!state.gameOver" class="input-container">
      <input
        v-model="state.currentGuess"
        type="text"
        :maxlength="props.word.length"
        placeholder="Введите свой вариант"
        class="guess-input"
        @keyup.enter="submitGuess"
      >
      <button
        @click="submitGuess"
        class="submit-button"
        :disabled="state.currentGuess.length !== props.word.length"
      >
        Попробовать
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
}

.game-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.guess-row {
  display: flex;
  gap: 0.5rem;
}

.letter-tile {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  /* transform-style: preserve-3d; */
}

.letter-tile.empty {
  border: 2px solid #d1d5db;
  background-color: white;
}

.letter-tile.correct {
  background-color: #22c55e;
}

.letter-tile.present {
  background-color: #eab308;
}

.letter-tile.absent {
  background-color: #6b7280;
}

.letter-tile.space {
  background-color: #bfdbfe;
  color: #1e40af;
}

.win-tile {
}

/* .delay-0 { animation-delay: 0s; }
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; } */

.input-container {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1rem;
}

.guess-input {
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
}

.guess-input:focus {
  border-color: #3b82f6;
}

.submit-button {
  padding: 0.5rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
}

.submit-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-button:focus {
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.game-message {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
}

.game-message.win-animation {
}

@keyframes flip-in {
  0% {
    /* transform: rotateX(0deg); */
    opacity: 0;
  }
  100% {
    /* transform: rotateX(360deg); */
    opacity: 1;
  }
}

@keyframes celebrate {
  0% {
    /* transform: scale(1) rotate(0deg); */
  }
  100% {
    /* transform: scale(1.1) rotate(5deg); */
  }
}

@keyframes win-bounce {
  0% {
    /* transform: translateY(0) scale(1); */
  }
  100% {
    /* transform: translateY(-10px) scale(1.1); */
  }
}
</style>