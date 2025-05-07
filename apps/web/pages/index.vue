<template>
    <div>
        <HomeHeader>
            <template #left>
                <div>
                    <MenuButton />
                </div>

            </template>
            <template #middle>
                <div>
                    <MenuButton />
                </div>
            </template>
            <template #right>
                <div>
                    <MenuButton />

                </div>
            </template>
    

        </HomeHeader>
    
        <Section class="city-section">
            <template #heading>
                Город
            </template>
    
            <div style="aspect-ratio: 16 / 9; border: 1px solid black;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate id a ratione magnam, eos impedit tempora amet nulla incidunt asperiores.
            </div>
        </Section>
    
        <Section class="story-section">
            <template #heading>
                Выбор сюжета
            </template>
    
            <StorySwiper />
        </Section>
    </div>
</template>
  
<style scoped>
.city-section {
    margin-block: 16px;
}
</style>
  