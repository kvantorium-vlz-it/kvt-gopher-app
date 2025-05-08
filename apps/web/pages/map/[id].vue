

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



    // console.log(JSON.stringify(response.value.data, null , 2)  );
    // onMounted(async()=>{
    //     const a = ref()
    //     a.value = await find('maps',{populate:['locations','image'],})
    //     console.log(JSON.stringify(a.value.data, null , 2)  );
     
    // })
    // const add = async () => {
    //     const { update,create } = useStrapi()
    //     await create('locations',  { name: 'My updated restaurant' })
    //     await create('maps',{
    //        name:'test',
    //         locations:['u33r8ro8l2e3lsnki90wx0gi']
    //     })
    // }


</script>



<template>
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <div class="header-grid">
            <div class="header-item">Component 1</div>
            <div class="header-item">Component 2</div>
            <div class="header-item large">Component 3</div>
          </div>
        </div>
      </header>
  
      <main class="main-content">
        <div class="map-container">
          <div class="map-buttons">
            <button @click="async () => await navigateTo('/general')" class="round-button left">
                <Icon style="font-size: 26px;"  name="material-symbols:reply-rounded"/>
            </button>
            <button class="round-button right">
                <Icon style="font-size: 26px;" name="material-symbols:chat-rounded"/>
            </button>
          </div>
          <div class="map-placeholder">
            <Map :points="response.data.locations"></Map>
          </div>
        </div>
      </main>
  
      <!-- <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2024 Map Application</p>
        </div>
      </footer> -->
    </div>
  </template>
  
  <style scoped>
  /* Reset and base styles */
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
  
  /* Header styles */
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
  
  .header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    gap: 1rem;
  }
  
  .header-item {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  /* Main content styles */
  .main-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Map container styles */
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
    top: 1rem;
    left: 0;
    right: 0;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }
  
  .round-button {
    width: 48px;
    height: 48px;
    border-radius: 16px;
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
  
  /* Footer styles */
  .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .header {
      padding: 0.5rem;
    }
  
    .header-grid {
      gap: 0.5rem;
    }
  
    .main-content {
      padding: 0.5rem;
    }
  
    .map-container {
      height: calc(100vh - 140px);
    }
  
    .map-placeholder {
      font-size: 1.2rem;
    }
  
    .round-button {
      width: 40px;
      height: 40px;
    }
  }
  
  @media (max-width: 480px) {
    .map-container {
      height: calc(100vh - 120px);
    }
  
    .round-button {
      width: 36px;
      height: 36px;
    }
  }
  </style>