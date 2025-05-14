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
            <Section>
                статистика
                <div class="statistic-card">
                    <Statistic :title="i.number" :description="i.label" v-for="i in stats"></Statistic>
                </div>
            </Section>
            
                <img src="../public/images/block-suslik.png" alt="">
            
            
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
                    <Card :active="i.active" :description="i.description" :title="i.title" v-for="i in achievements"/>
                    
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
  