<script setup lang="ts">
    const { params } = useRoute()
    const router = useRouter()
    const { logout,fetchUser  } = useStrapiAuth()
    const { find,findOne,create  } = useStrapi()
    const response = ref()
    const MapId = params.id as string
    response.value = await findOne('maps',MapId,{
        populate:['locations']
    })
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
            <button class="round-button ">
                <Icon style="font-size: 20px;" name="material-symbols:chat-rounded"/>
            </button>
          </div>
          <div class="map-placeholder">
            <Map :points="response.data.locations"></Map>
          </div>
        </div>
      </main>
    </div>
</template>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

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
</style>