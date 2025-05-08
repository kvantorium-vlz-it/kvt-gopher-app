<script setup lang="ts">

const { fetchUser } = useStrapiAuth()
const user = await fetchUser()
const { find, findOne } = useStrapi()
const cities = await find('cities')

const name = user.value?.username!

</script>


<template>
    <div class="main">
        <TheHeader :username="name "/>
        <div class="display">
            <HomeHeader>
                <template #left>

                    <MenuButton title="Телефон">
                        <template #icon>
                            <Icon name="material-symbols:phone-android"/>
                        </template>
                    </MenuButton>

                </template>
                <template #middle>
                        <MenuButton title="магазин">
                        <template #icon>
                            <Icon name="tdesign:shop"/>
                        </template>
                    </MenuButton>
                </template>
            <template #right>
                    <MenuButton title="рейтинг">
                    <template #icon>
                            <Icon name="solar:cup-outline"/>
                        </template>
                    </MenuButton>
            </template>
            
            
        </HomeHeader>
        
        <Section class="city-section">
            город
            <CityArea/>
        </Section>
        
        <Section class="story-section">
            выбор сюжета
            
            <CardSwiper 
                :id="cities.data[0].documentId"
            />
        </Section>
      </div>
    </div>
</template>
  
<style scoped>
.main {
  font-size: 20px;
    gap: 16px;
    display: flex;
    flex-direction: column;
}

.display{
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0px 20px;
}

</style>
  