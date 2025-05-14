<template>
    <div class="chat-container">
      <div class="chat-window">
        <div class="chat-header">
          <TwelveText class="chat-title">Story Chat</TwelveText>
        </div>
        
        <div class="messages-container">
          <div v-for="(message, index) in visibleMessages" :key="index" class="message-container">
            <ChatMessage
              :author="getAuthor(message.authorId).name"
              :message="message.text"
              :is-current-user="getAuthor(message.authorId).name === currentUser"
              :avatar="getAuthor(message.authorId).avatar"
              :image="message.image"
              @image-click="openImageModal"
              @image-load="scrollToBottom"
            />
          </div>
        </div>
        
        <div v-if="currentOptions.length > 0" class="options-container">
          <TwentyText class="options-title">Choose next response:</TwentyText>
          <button
            v-for="(option, index) in currentOptions"
            :key="index"
            @click="selectOption(option)"
            class="option-button"
          >
          <TwelveText>{{ option.text }}</TwelveText>
          </button>
        </div>
  
        <div class="next-message-container">
          <TwentyText class="chat-timer">Auto-scroll in: {{ timer }}s</TwentyText>
          <button 
          @click="showNextMessage" 
          :disabled="currentMessageIndex >= currentStory.length"
          class="next-button"
          >
          <TwentyText class="button-action-text"><slot>вперёд!</slot></TwentyText>
        </button>
        <button v-if="isFinished"
          @click="async () => await navigateTo(`/locationGame/${locationId}`)" 
          class="next-button"
        >
          <TwentyText class="button-action-text"><slot>-></slot></TwentyText>
        </button>
        </div>
      </div>

      <!-- Image Modal -->
      <Transition name="modal">
        <div v-if="selectedImage" class="modal" @click="closeImageModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeImageModal">&times;</button>
            <img :src="selectedImage" alt="Full size image" class="modal-image" />
          </div>
        </div>
      </Transition>
    </div>
</template>

<script setup>
const { params } = useRoute()
const locationId = params.id 
const { find, findOne } = useStrapi()


const location = await findOne('locations',locationId , {
  populate:{
    game:{
      fields:'documentId'
    },
    story:true
  }
})


const story = await findOne('stories',location.data.story.documentId,{
  populate:{
    speakers:{
      populate:{
        avatar:{
          fields:'url'
        }
      }
    },
    speaker:true,

  }
})

const isFinished= ref(false)

const currentUser = ref(story.data.speaker.name)
const visibleMessages = ref([])
const timer = ref(5)
const currentMessageIndex = ref(0)
const selectedImage = ref(null)
let autoScrollInterval


const authorsList = story.data.speakers.map((speaker) => ({
    name:speaker.name,
    avatar:`http://localhost:1337${speaker.avatar.url}`
  }))

const getAuthor = (authorId) => {
  return authorsList.find(author =>  author.name.toLocaleLowerCase() === authorId.toLocaleLowerCase()) || authorsList[0]
}


const storyBranches = new Function(`return ${story.data.content}`)();

const currentStory = ref(storyBranches.main)
const currentOptions = ref([])

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const showNextMessage = () => {
  if (currentMessageIndex.value < currentStory.value.length) {
    const message = currentStory.value[currentMessageIndex.value]
    visibleMessages.value.push(message)
    
    if (message.options) {
      currentOptions.value = message.options
      clearInterval(autoScrollInterval)
    }
    
    currentMessageIndex.value++
    timer.value = 5
    scrollToBottom()
  }
}

const selectOption = (option) => {
  currentOptions.value = []
  currentStory.value = storyBranches[option.branch]
  currentMessageIndex.value = 0
  timer.value = 5
  showNextMessage() // Show first message immediately
  startAutoScroll()
}

const startAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }

  autoScrollInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      showNextMessage()
      timer.value = 5
    }
    
    if (currentMessageIndex.value >= currentStory.value.length || currentOptions.value.length > 0) {
      clearInterval(autoScrollInterval)
      isFinished.value = true
    }
  }, 1000)
}

const openImageModal = (image) => {
  selectedImage.value = image
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  showNextMessage()
  startAutoScroll()
})

onUnmounted(() => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
})
</script>

<style scoped>
@keyframes messageAppear {
  from {
    opacity: 0;
    /* transform: translateY(20px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
}

.chat-container {
  height: 100vh;
  /* background-color: #f3f4f6; */
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.chat-window {
  max-width: 42rem;
  width: 100%;
  height: calc(100vh - 2rem);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

@media (max-width: 640px) {
  .chat-container {
    padding: 0;
  }
  
  .chat-window {
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
  }
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.chat-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

@media (max-width: 640px) {
  .chat-title {
    font-size: 1.25rem;
  }
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin: -0.5rem;
  padding: 0.5rem;
  scroll-behavior: smooth;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.chat-timer {
  font-size: 0.875rem;
  color: #6b7280;
}

.options-container {
  margin-top: 1.5rem;
}

@media (max-width: 640px) {
  .options-container {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
  }
}

.options-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.option-button {
  width: 100%;
  padding: 0.75rem;
  text-align: left;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  /* transform: translateY(0); */
}

.option-button:hover {
  background-color: #e5e7eb;
  /* transform: translateY(-2px); */
}

.next-message-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 640px) {
  .next-message-container {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
  }
}

.next-button {
  padding: 0.5rem 1rem;
  background-color: rgba(71, 125, 255, 1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
}

.next-button:hover:not(:disabled) {
  /* transform: translateY(-2px); */
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background-color: rgba(217, 217, 217, 1);
  border-radius: 8px;
  padding: 8px;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: rgba(217, 217, 217, 1);
  font-size: 2rem;
  cursor: pointer;
  padding: 8px;
}

.modal-close:hover {
  /* transform: rotate(90deg); */
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  /* transform: scale(0.9); */
}

/* Additional animations */
@keyframes windowAppear {
  from {
    opacity: 0;
    /* transform: translateY(20px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    /* transform: translateY(-20px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    /* transform: translateY(20px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
}

@media (max-width: 640px) {
  .modal-content {
    width: 95vw;
    margin: 16px;
  }
  
  .modal-close {
    top: -36px;
    right: -8px;
  }
}
</style>