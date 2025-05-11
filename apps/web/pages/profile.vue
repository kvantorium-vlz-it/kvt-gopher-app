<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';
import BlockClothes from '~/components/BlockClothes.vue';
import SelectClothes from '~/components/BlockClothes.vue';

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
            <CitySelect></CitySelect>
            <Section>
                статистика
                <div class="statistic-card">
                    <Statistic></Statistic>
                    <Statistic></Statistic>
                    <Statistic></Statistic>
                    <Statistic></Statistic>
                </div>
            </Section>
            <div>
                <img src="../public/images/block-suslik.png" alt="">
            </div>
            
            <Section class="achievements">
                <div class="achievements-header">
                    <div class="achievements-header-left">
                        достижения
                    </div>
                    <div class="achievements-header-right">
                        <a style="text-decoration: none; color: black;" href="???">
                            смотреть всё>
                        </a>
                    </div>
                </div>
                <div class="blocks">
                    <Card/>
                    <Card/>
                </div>
            </Section>
            <!-- <Section class="suslik-area-card">
                asdsadsa
                <div class="suslik-card">
                    <img src="../public/images/suslik.png" alt="">
                    <img src="../public/images/inventar.png" alt="">
                                <div class="menu">
                <Block>
                    <MenuButton>
                        <template #icon>
                            <Icon name="tdesign:shop"/>
                        </template>
                    </MenuButton>
                </Block>
                <Block>
                    <MenuButton>
                        <template #icon>
                            <Icon name="tdesign:shop"/>
                        </template>
                    </MenuButton>
                </Block>
                <Block>
                    <MenuButton>
                        <template #icon>
                            <Icon name="tdesign:shop"/>
                        </template>
                    </MenuButton>
                </Block>
                <Block>
                    <MenuButton>
                        <template #icon>
                            <Icon name="tdesign:shop"/>
                        </template>
                    </MenuButton>
                </Block>
                </div>    
                </div>

            </Section>  -->
        </div>
    </div>
</template>
  
<style scoped>
/* .menu{
    display: flex;
    flex-direction: column;
}
.suslik-area-card{
    display: flex;
    flex-direction: row;
}

.suslik-card{
    display: grid;
    grid-template-columns: repeat(3, 1fr);

} */
.achievements-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.blocks{
    display: flex;
    gap: 16px;
}
.statistic-card{
    display: flex;
    flex-direction: row;
    gap: 16px;
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
    gap: 20px;
    padding: 0px 20px;
}

</style>
  