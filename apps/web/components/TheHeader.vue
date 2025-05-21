<script setup lang="ts">
import TenText from './text/TenText.vue';
import TwentyText from './text/TwentyText.vue';

defineProps<{
    /**
     * имя пользователя
     */
    username: string
}>()

</script>
<template>
    <div>
        <Block class="header" @click="console.log('d')">
                <div class="img">
                    <img src="../public/images/Semen.png" alt="Profile avatar">
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
    padding: 50px 10px 10px 10px;
    border-radius: 0;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-color: #EFEFEF;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border: none;
    width: 100%;
    cursor: pointer;
    flex-direction: row;

}

.grey{
    color: grey;
    opacity: 50%;
}
.img{
    border-radius: 50%;
    width: 48px;
    height: 48px;
    overflow: hidden;
    border: 1px solid #ffffff8c;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}
.img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>