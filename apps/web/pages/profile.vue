<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';
import BlockClothes from '~/components/BlockClothes.vue';
import SelectClothes from '~/components/BlockClothes.vue';

const { fetchUser } = useStrapiAuth()
const user = await fetchUser()
const { find, findOne } = useStrapi()


const name = user.value?.username!
const stats = [
  { number: '120', label: 'ЗАДАНИЙ СОБРАНО' },
  { number: '9', label: 'КАРТ ОТПРАВЛЕНО' },
  { number: '56', label: 'ДОСТИЖЕНИЙ СОБРАНО' },
  { number: '4K', label: 'КАРТ ПРОЙДЕНО' }
]

// const achievements = [
//   {
//     id: '1',
//     title: 'СОБИРАТЕЛЬ',
//     description: 'СОБЕРИТЕ 100 ЗАДАНИЙ',
//     color: '#FFE586',
//     active: true
//   },
//   {
//     id: '2',
//     title: 'ЧУДО-МЭР',
//     description: 'ДОСТИГНИТЕ ОТМЕТКИ В 1000 ЖИТЕЛЕЙ В СВОЕМ ГОРОДЕ',
//     color: '#FFD6D6',
//     active: false
//   }
// ]
const achievements = await find('user-achievements',{
    populate:{
        achievement:true
    }
})
const city = ref()
city.value = await findOne('cities',getData('cityId'))

const cities = await find('cities')
const handleCitySelected = ({ city }) => {
setData('cityId', city, 1 , 'd')
}

</script>


<template >
    <div class="main">
        <TheHeader :username="name "/>
        <div class="display">
            <CitySelect
                :cities="cities.data"
                @citySelected="handleCitySelected"
                :value="city.data.name"
            />
            <Section>
                статистика
                <div class="statistic-card">
                    <Statistic :title="i.number" :description="i.label" v-for="i in stats"></Statistic>
                </div>
            </Section>
            
                <img src="../public/images/block-suslik.png" alt="">
            
            
            <div class="section">
                <div class="achievements-header">
                    <TwentyText>достижения</TwentyText>
                    <a style="text-decoration: none; color: black;" href="???"><TwentyText>смотреть всё></TwentyText></a>
                </div>
                <div class="blocks">
                    <Card :active="i.active" :description="i.description" :title="i.title" v-for="i in achievements"/>
                    
                </div>
            </div>
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
 .section{
    display: flex;
    gap: 16px;
    flex-direction: column;
}
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
  