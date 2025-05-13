<script setup lang="ts">
import TenText from './text/TenText.vue';
import TwentyText from './text/TwentyText.vue';

defineProps<{
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
    padding: 14px 10px 10px 10px;
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

.header:hover {
    background-color: #E5E5E5;
    transform: translateY(-1px);
}

.header:active {
    transform: translateY(0);
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
    flex-shrink: 0;
}
.img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 768px) {
    .header {
        padding: 16px;
        gap: 8px;
    }
    
    .img {
        width: 40px;
        height: 40px;
    }
}
</style>