<script setup lang="ts">
import TenText from './text/TenText.vue';
import TwentyText from './text/TwentyText.vue';

defineProps<{
    username: string
}>()

</script>
<template>
    <div>
        <Block class="header">
                <div  class="img">
                    <img src="../public/images/Semen.png">
                    
                </div>

                <div class="text">
                    <TwentyText>{{username}}</TwentyText>
                    <TenText class="grey">0 exp</TenText>                
                </div>    

        </Block>
    </div>
</template>
<style scoped>
.text{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header{
    display: flex;
    padding: 71px 155px 10px 152px;
    justify-content: center;
    gap: 7px;
    background-color: #EFEFEF;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
}
.grey{
    color: grey;
    opacity: 50%;
}
.img{
    border-radius: 50px;
    width: 48px;
    height: 48px;
    overflow: hidden;
}
</style>