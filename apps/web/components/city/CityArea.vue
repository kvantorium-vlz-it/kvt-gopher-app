<script setup lang="ts">
</script>
<template>
    <div class="city-area" >
        <Block class="city-area-card" style="background-image: url(images/uihtfio.svg);">
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
    /* background-image: url(images/suslic.jpg); */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #EFEFEF;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* background-size: 100%; */
    background-image: url(/apps/web/public/images/city-back.svg);
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