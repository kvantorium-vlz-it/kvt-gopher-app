<script setup lang="ts">
defineProps<{
  id: string
  title: string
  description: string
  percent: number
  image?: string  
}>()
</script>
<template>
    
    <Block class="plot-area-card">
        <div class="plot-call-area">
            <div class="plot-name-area">
                <TwentyText>{{ title }} <br>волжский</TwentyText>
                <TenText class="opacity">{{ description }}</TenText>
            </div>
            <div class="plot-inf-area">
                <div class="plot-percent">
                    <TwelveText class="opacity">{{ percent }}%</TwelveText>
                </div>
                <TwelveText class="opacity">выбрано</TwelveText>
            </div>
        </div>
        <ButtonAction class="white" @click="async() => {await navigateTo(`map/${id}`)}">вперёд!</ButtonAction>
        <!-- <img src="../../public/images/52.svg" class="image-plot"> -->

    </Block>
    

</template>
<style scoped>
/* .image-plot{
    position: absolute;
    z-index: -1;
} */
.plot-area-card {
  isolation: isolate;
  border-radius: 16px;
  padding: 20px;
  width: 322px;
  height: 285px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: flex-start;
  background-image: url(../../public/images/52.svg);
  background-size: 100%;
  
}

.plot-area-card:hover {
  transform: translateY(-5px);
}

.plot-name-area{
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.plot-call-area{
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.opacity{
    color: #00000050;
}

.plot-percent{
    background-color: #FFFFFF;
    padding: 4px 13.5px;
    border-radius: 6px;
}
.plot-inf-area{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
}
</style>