<script setup lang="ts">
  const { params } = useRoute()
  const router = useRouter()
  const { logout,fetchUser  } = useStrapiAuth()
  const { find,findOne,create  } = useStrapi()
  const response = ref()
  const MapId = params.id as string
  response.value = await findOne('maps',MapId,{
    populate:{
      locations:{
        populate:{

          images:true
        }
      },
      map_story:true
    }
  })
  console.log(response.value.data);
  
  const user = await fetchUser()
  const userId = user.value?.documentId


  const mapData = await findOne('maps', MapId, { populate: 'locations' })
  const progresses = await find('user-location-progresses', {
    filters: {
      users_permissions_user: { documentId: userId },
      location: { map: { documentId: MapId } }
    }
  })

  const compled = progresses.data.length
  const all = mapData.data.locations.length
  const progress = (compled / all)*100
  const isChatOpen = ref(false)
  
  const story = await findOne('map-stories', response.value.data.map_story.documentId, {
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
  
  

  const hasSeen = ref()
  hasSeen.value = await hasSeenDialog()
  // console.log(await hasSeenDialog());
  

  async function hasSeenDialog() {
    const existing = await find('user-map-stories', {
      filters: {
        users_permissions_user: { documentId: { $eq: userId } },
        map_story: { documentId: { $eq: story.data.documentId } },
      },
    })
    
    if (existing?.data?.length > 0) {
      console.log(existing.data);
      
      console.log('Вы уже проходили эту локацию')
      return true
    }else{
      
      setTimeout(() => {

        openChat()
      },300)

      
      
      return false
    }
  }

  const openChat = () => {
    isChatOpen.value = true
  }
  
  const closeChat = () => {
    isChatOpen.value = false
  }
</script>

<template>
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <div class="stats-container">
            <MapStat text="собрано" :number="compled"/>
            <MapStat text="осталось" :number="all - compled"/>
          </div>
          <div class="progress-container">
            <MapProgress :progress="progress"/>
          </div>
        </div>
      </header>
  
      <main class="main-content">
        <div class="map-container">
          <div class="map-buttons">
            <button @click="async () => await navigateTo('/general')" class="round-button ">
                <Icon style="font-size: 20px;"  name="material-symbols:reply-rounded"/>
            </button>
            <button class="round-button" @click="openChat" >
                <Icon style="font-size: 20px;" name="material-symbols:chat-rounded"/>
            </button>
          </div>
          <div class="map-placeholder">
            <Map :points="response.data"></Map>
          </div>
        </div>
      </main>
    </div>
      
    <StoryChat
        :is-open="isChatOpen"
        :story="story.data"
        :speakers="story.data.speakers"
        :current-user="story.data.speaker.name"
        :has-seen-dialog="hasSeen"
        :map-story-id="story.data.documentId"
        @close="closeChat"
      />
    
</template>
  
<style scoped>


.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

 

.progress-container {
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-container {
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 160px);
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.map-buttons {
  position: absolute;
  top: 0.75rem;
  left: 0;
  right: 0;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.round-button {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.round-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  color: #666;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem;
  }

  .stat-number {
    font-size: 42px;
  }

  .main-content {
    padding: 0.5rem;
  }

  .map-container {
    height: calc(100vh - 140px);
    border-radius: 6px;
  }

  .map-buttons {
    top: 0.5rem;
    padding: 0 0.5rem;
  }

  .round-button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0.5rem;
  }

  .stat-number {
    font-size: 36px;
  }

  .stat-label {
    font-size: 12px;
  }

  .map-container {
    height: calc(100vh - 120px);
    border-radius: 4px;
  }

  .map-buttons {
    top: 0.25rem;
    padding: 0 0.25rem;
  }

  .round-button {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }
}
.chat-trigger {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 2rem;
    background-color: rgba(71, 125, 255, 1);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
  }
  
  .chat-trigger:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
  }
  
  @media (max-width: 640px) {
    .chat-trigger {
      bottom: 1rem;
      right: 1rem;
      padding: 0.75rem 1.5rem;
    }
  }
</style>