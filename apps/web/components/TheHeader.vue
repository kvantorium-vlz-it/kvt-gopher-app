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
    display: flex;
    padding: 20px;
    justify-content: center;
    gap: 12px;
    background-color: #EFEFEF;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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