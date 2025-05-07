<script setup lang="ts">
</script>
<template>
    <div class="menu">
    <button class="phone">
        <Icon name="material-symbols:phone-android" class="menu-phone-icon"/>
        <TwelveText>телефон</TwelveText>
    </button>
    <button class="shop">
        <Icon name="tdesign:shop" class="menu-shop-icon"/>
        <TwelveText>магазин</TwelveText>
    </button>
    <button class="rating">
        <Icon name="solar:cup-outline" class="menu-rating-icon"/>
        <TwelveText>рейтинг</TwelveText>
    </button>
    </div>
</template>
<style scoped>
.menu{
    display: flex;
    flex-direction: row;
    justify-content: center;

}
.phone{
    width: 100%;
    padding: 14px 10px 11px 10px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border:none;
}

.menu-phone-icon{
    font-size: 26px;
}
.shop{
    padding: 13px 67px 11px 67px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border:none;
}

.menu-shop-icon{
    font-size: 26px;
}
.rating{
    width: 100%;
    padding: 14px 13px 11px 12px;
    border-radius: 16px;
    background-color: #EFEFEF;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border:none;
}

.menu-rating-icon{
    font-size: 26px;
}
</style>
