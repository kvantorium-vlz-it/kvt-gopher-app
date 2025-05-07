<script setup lang="ts">
</script>
<template>
    <div class="city-area">
        <Block class="city-area-card">
            <TwentyText class="white">Ваши граждане скучают <br>по своему мэру!</TwentyText>
            <ButtonAction class="white">вперёд!</ButtonAction>
            <!-- <img src="../public/images/Semen.png" class="city-area-card-background"> -->
        </Block>
        
    </div>
</template>
<style scoped>
.city-area{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.city-area-card{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #EFEFEF;
    height: 200px;
    background-image: url(../public/images/Semen.png);
    background-size: 100%;
}
.white{
    color: #ffffff;
}

.city-area-card-background{
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>