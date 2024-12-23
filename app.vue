<template>
    <div>
        <div v-for="question, questionIndex in quiz1?.Questions">
            <!-- <template v-if="questionIndex === currentQuestionIndex"> -->
                <h1>
                    {{questionIndex}} {{ question.id }} | {{ question.text }}
                </h1>

                <form @submit.prevent="submitHandler">
                    <label
                        :for="`answer-${questionIndex}-${answerIndex}`"
                        v-for="answer, answerIndex in question.Answers"
                        :class="{
                            'text-green-600': answer.is_true
                        }"
                    >
                        <input
                            type="radio"
                            :id="`answer-${questionIndex}-${answerIndex}`"
                            :name="`question-${questionIndex}`"
                        >
                        {{ answer.text }}
                    </label>

                    <br>
                    <button type="submit">
                        Ответить
                    </button>
                </form>
            <!-- </template> -->
        </div>
    </div>
</template>

<script setup lang="ts">
const quiz1 = await $fetch('/api/quizs/1/utils')

const submitHandler = () => {
    currentQuestionIndex.value++
}

let currentQuestionIndex = ref(0)
</script>