<script setup lang="ts">
import { getData, setData } from 'nuxt-storage/local-storage';
import BlockClothes from '~/components/BlockClothes.vue';
import SelectClothes from '~/components/BlockClothes.vue';

const { fetchUser } = useStrapiAuth()
const user = await fetchUser()
const { find, findOne } = useStrapi()
const cities = await findOne('cities',getData('cityId'))

const name = user.value?.username!
const stats = [
  { number: '120', label: 'ЗАДАНИЙ СОБРАНО' },
  { number: '9', label: 'КАРТ ОТПРАВЛЕНО' },
  { number: '56', label: 'ДОСТИЖЕНИЙ СОБРАНО' },
  { number: '4K', label: 'КАРТ ПРОЙДЕНО' }
]

const achievements = [
  {
    id: '1',
    title: 'СОБИРАТЕЛЬ',
    description: 'СОБЕРИТЕ 100 ЗАДАНИЙ',
    color: '#FFE586',
    active: true
  },
  {
    id: '2',
    title: 'ЧУДО-МЭР',
    description: 'ДОСТИГНИТЕ ОТМЕТКИ В 1000 ЖИТЕЛЕЙ В СВОЕМ ГОРОДЕ',
    color: '#FFD6D6',
    active: false
  }
]
</script>


<template >
    <div class="main">
        <TheHeader :username="name "/>
        <div class="display">
            <CitySelect></CitySelect>

            <div class="section">
                <TwentyText>статистика</TwentyText>
                <div class="statistic-card">
                    <Statistic :title="i.number" :description="i.label" v-for="i in stats"></Statistic>
                </div>
            </div>
                
            
                <!-- <img src="../public/images/block-suslik.png" alt=""> -->
            
            <div class="section">
                <div class="achievements-header">
                    <TwentyText>достижения</TwentyText>
                    <a style="text-decoration: none; color: black;" href="???"><TwentyText>смотреть всё></TwentyText></a>
                </div>
                <div class="blocks">
                    <Card :active="i.active" :description="i.description" :title="i.title" v-for="i in achievements"/>
                    
                </div>
            </div>
            

            <div class="inv-area">
                <div class="achievements-header">
                    <TwentyText>чушпаньё</TwentyText>
                </div>
                <div class="ch-area">
                    <div class="p">
                        <img src="/images/suslik.png">
                        <img src="/images/abibas.png" class="w">
                    </div>
                    <div class="inventar-area">
                        <Block class="g" @click="() => console.log(0, 0)"><img src="/images/x.png" class="image" style="padding: 16px;"></Block>
                        <Block class="g" @click="() => console.log(1, 0)"><img src="/images/abibas.png" class="image"></Block>
                        <Block class="g" @click="() => console.log(2, 0)"></Block>
                        <Block class="g" @click="() => console.log(0, 1)"></Block>
                        <Block class="g" @click="() => console.log(1, 1)"></Block>
                        <Block class="g" @click="() => console.log(2, 1)"></Block>
                        <Block class="g" @click="() => console.log(0, 2)"></Block>
                        <Block class="g" @click="() => console.log(1, 2)"></Block>
                        <Block class="g" @click="() => console.log(2, 2)"></Block>
                    </div>
                    <div class="tab-area-grid">
                        <ButtnoTubChushpan></ButtnoTubChushpan>
                        <ButtnoTubChushpan></ButtnoTubChushpan>
                        <ButtnoTubChushpan></ButtnoTubChushpan>
                        <ButtnoTubChushpan></ButtnoTubChushpan>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
</template>
  
<style scoped>
.p{
    padding-left: 24px;
    position: relative;
}
.inv-area{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.g{
    background-color: #F4F4F4;
    width: 57px;
    aspect-ratio: 1;
    padding: 6px;
    display: flex;
    align-items: center;
}

.w{
    position: absolute;
    width: 49%;
    top: 57px;
    left: 12%;
    z-index: 5;
}
.tab-area-grid{
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: 1fr;
}
.ch-area{
    display: grid;
    grid-template-columns: 4fr 5fr 1fr;
    grid-template-rows: repeat(3,1fr);
    gap: 16px;
}
.menu{
    display: flex;
    flex-direction: column;
}
.suslik-area-card{
    display: flex;
    flex-direction: row;
}

/* .suslik-card{
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

.inventar-area{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    gap: 16px;
}

.image{
    display: block;
    width: 100%;
}

</style>
  