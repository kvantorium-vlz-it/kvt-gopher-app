<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';

const { fetchUser } = useStrapiAuth()
const user = await fetchUser()
const { find, findOne } = useStrapi()
const cities = await findOne('cities',getData('cityId'))

const name = user.value?.username!

</script>


<template >
    <div class="main">
        <TheHeader :username="name "/>
        <div class="display">
            <ButtonsAchivments>
                <template #left>

                    <MenuButton title="мир">
                        <template #icon>
                            <Icon name="material-symbols:travel-explore"/>
                        </template>
                    </MenuButton>

                </template>
                <template #middle>
                        <MenuButton title="город">
                        <template #icon>
                            <Icon name="tdesign:city-filled"/>
                        </template>
                    </MenuButton>
                </template>
            <template #right>
                    <MenuButton title="битвы">
                    <template #icon>
                            <Icon name="material-symbols-light:swords-rounded"/>
                        </template>
                    </MenuButton>
            </template>
                    <template #main>
                        <MenuButton title="другое">
                        <template #icon>
                            <Icon name="majesticons:more-menu"/>
                        </template>
                    </MenuButton>
                </template>
            
            
        </ButtonsAchivments>
        <div class="cards">
            <Card></Card>
            <Card></Card>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
.cards{
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
}
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
  