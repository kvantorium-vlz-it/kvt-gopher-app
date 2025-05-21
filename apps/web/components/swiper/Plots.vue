<script setup lang="ts">
defineProps<{

    /**
     * id записи карты в базе данных
     */
  id: string
    /**
     * называние карты
     */
  title: string
    /**
     * описание карты
     */
  description: string
    /**
     * процент прохождения по карте
     */
  percent: number
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

    </Block>
    

</template>
<style scoped>
.plot-area-card {
  isolation: isolate;
  border-radius: 16px;
  padding: 20px;
  width: 322px;
  height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-image: url(../../public/images/52.svg);
  background-size: 100%;
  
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