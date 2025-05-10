<template>
  <Transition name="slide">
    <div v-if="isOpen" class="chat-container">
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

        <div class="next-message-container">
          <TwentyText v-if="!hasSeenDialog" class="chat-timer">Auto-scroll in: {{ timer }}s</TwentyText>
          <button 
            @click="showNextMessage" 
            :disabled="currentMessageIndex >= storyMessages.length"
            class="next-button"
          >
            <TwentyText class="button-action-text"><slot>вперёд!</slot></TwentyText>
          </button>
          <button 
            v-if="isFinished"
            @click="close"  
            class="next-button"
          >
            <TwentyText class="button-action-text"><slot>закрыть</slot></TwentyText>
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
  </Transition>
</template>

<script setup>

const props = defineProps({
  isOpen: {
      type: Boolean,
      required: true
  },
  story: {
      type: Object,
      required: true
  },
  speakers: {
      type: Array,
      required: true
  },
  currentUser: {
      type: String,
      required: true
  },
  hasSeenDialog:{
      type: Boolean,
      required: true
  },
  mapStoryId:{
      type: String,
      required:true
  }
})
  
const { find, create, findOne } = useStrapi()
const emit = defineEmits(['close'])

const hasSeenDialog = ref(props.hasSeenDialog)
const isFinished = ref(false)

const visibleMessages = ref([])
const timer = ref(5)
const currentMessageIndex = ref(0)
const selectedImage = ref(null)
let autoScrollInterval


watch(isFinished, async(newValue) => {
  const {  fetchUser } = useStrapiAuth()
  
  if (newValue) { 
    try {
      const user = await fetchUser()
      const userId = user.value?.documentId
      const existing = await find('user-map-stories', {
      filters: {
        users_permissions_user: { documentId: { $eq: userId } },
        map_story: { documentId: { $eq: props.mapStoryId } },
        },
      })

      if (existing?.data?.length > 0) {
        return
      }
          
      await create('user-map-stories', {
        users_permissions_user: userId,
        map_story: props.mapStoryId,
      })
      
    }catch (err) {
        console.error('Ошибка при создании прогресса:', err)
        alert('Произошла ошибка')
    }
  }
  
});

const authorsList = computed(() => props.speakers.map((speaker) => ({
  name: speaker.name,
  avatar: `http://localhost:1337${speaker.avatar.url}`
})))

const getAuthor = (authorId) => {
  return authorsList.value.find(author => author.name.toLocaleLowerCase() === authorId.toLocaleLowerCase()) || authorsList.value[0]
}

const storyMessages = computed(() => {
  const storyData = new Function(`return ${props.story.content}`)()
  return storyData.main || []
})

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const showNextMessage = () => {
  if (currentMessageIndex.value < storyMessages.value.length) {
    const message = storyMessages.value[currentMessageIndex.value]
    visibleMessages.value.push(message)
    currentMessageIndex.value++
    timer.value = 5
    scrollToBottom()
    
    if (currentMessageIndex.value >= storyMessages.value.length) {
      isFinished.value = true
      hasSeenDialog.value = true
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }
  }
}

const startAutoScroll = () => {
  if (hasSeenDialog.value) {
    while (currentMessageIndex.value < storyMessages.value.length) {
      showNextMessage()
    }
    isFinished.value = true
    return
  }

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
    
    if (currentMessageIndex.value >= storyMessages.value.length) {
      clearInterval(autoScrollInterval)
      isFinished.value = true
      hasSeenDialog.value = true
    }
  }, 1000)
}

const close = () => {
  emit('close')
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
}

const openImageModal = (image) => {
  selectedImage.value = image
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    if (!hasSeenDialog.value) {
      visibleMessages.value = []
      currentMessageIndex.value = 0
      isFinished.value = false
      timer.value = 5
      showNextMessage()
      startAutoScroll()
    } else {
      if (visibleMessages.value.length === 0) {
        while (currentMessageIndex.value < storyMessages.value.length) {
          showNextMessage()
        }
      }
    }
  } else {
    document.body.style.overflow = 'auto'
  }
})

onUnmounted(() => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.chat-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.chat-window {
  width: 100%;
  max-width: 42rem;
  height: calc(100vh - 2rem);
  margin: 1rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.chat-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}



.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
}

.messages-container::-webkit-scrollbar {
  width: 4px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.next-message-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.chat-timer {
  font-size: 0.875rem;
  color: #6b7280;
}

.next-button {
  padding: 0.75rem 1.5rem;
  background-color: rgba(71, 125, 255, 1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2001;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (max-width: 640px) {
  .chat-window {
    margin: 0.5rem;
    height: calc(100vh - 1rem);
  }

  .chat-header {
    padding: 0.75rem 1rem;
  }

  .messages-container {
    padding: 0.75rem;
  }

  .next-message-container {
    padding: 0.75rem 1rem;
  }

  .next-button {
    padding: 0.5rem 1rem;
  }

  .modal-close {
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>