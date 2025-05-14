<script setup lang="ts">
import TenText from './text/TenText.vue';

const props = defineProps<{
  title: string
  description: string
}>()
</script>
<template>   
    <Block class="statistic-block">
        <div class="statistic-area-block">
            <Fortyeight>{{ title }}</Fortyeight>
            <TenText class="center">{{ description }}</TenText>
        </div>

    </Block>
</template>
<style scoped>
.statistic-area-block{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.statistic-block{
  background-color: #EFEFEF;
  border-radius: 16px;
  padding: 20px 19px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}
.center{
  text-align: center;
}
</style>