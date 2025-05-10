<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  description: string
  image?: string
  color: string;
  active: boolean;
  
}>()
const IsActive = ref(props.active)
</script>
<template>
    
    <Block class="card-area-card">
        <div class="card-call-area">
            <div class="card-name-area">
                <TwentyText>{{ title }}</TwentyText>
                <TenText class="opacity">{{ description }}</TenText>
            </div>
            <div class="card-inf-area">
                <TwelveText class="opacity"></TwelveText>
            </div>
        </div>
        <ButtonAction :disabled="!IsActive" @click="() => {IsActive = false}">
            <span v-if="!IsActive">собрано</span>
            <span v-if="IsActive">собрать!</span>
        </ButtonAction>
        <!-- <img src="../public/images/Semen.png" class="city-area-card-background"> -->
    </Block>
    

</template>
<style scoped>
.card-area-card {
  background: radial-gradient(#FFE586, #FBFBFB);
  background-position: bottom left;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

/* .card-area-card:hover {
  transform: translateY(-5px);
} */

.card-name-area{
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.card-call-area{
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.opacity{
    color: #00000050;
}
.card-inf-area{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
    padding: 24px 0px;
}
</style>