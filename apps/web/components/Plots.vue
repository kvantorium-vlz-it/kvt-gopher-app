<script setup lang="ts">

</script>
<template>
    <div class="city-area">
        <Block class="plot-area-card">
            <div class="plot-call-area">
                <div class="plot-name-area">
                    <TwentyText>Догнать время. <br>волжский</TwentyText>
                    <TenText class="opacity">Кажется тебе и верному спутнику самое время окунуться в захватывающие приключения в небольшом городе на берегу великой реки Волги</TenText>
                </div>
                <div class="plot-inf-area">
                    <div class="plot-percent">
                        <TwelveText class="opacity">0%</TwelveText>
                    </div>
                    <TwelveText class="opacity">выбрано</TwelveText>
                </div>
            </div>
            <ButtonAction class="white">вперёд!</ButtonAction>
            <!-- <img src="../public/images/Semen.png" class="city-area-card-background"> -->
        </Block>
        
    </div>
</template>
<style scoped>
.plot-area-card{
    width: 322px;
    height: 285px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
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