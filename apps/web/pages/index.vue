

<template>


  <div class="app-container">
    <div class="container">

      <WelcomeScreen />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 15vh;
}
.app-container {
  background: #f7fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  
 
}

@media (max-width: 480px) {
  .app-container {
    padding: 16px;
  }
}
</style>