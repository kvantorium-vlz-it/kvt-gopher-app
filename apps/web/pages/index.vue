<template>
    <div>
        <HomeHeader>
            <template #left>
                <div style="border: 1px solid black; background: red;">
                    Lorem, ipsum.
                </div>
            </template>
    
            <template #right>
                <div style="background: green; height: 100px;">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, et!
                </div>
            </template>
    
            <template #middle>
                <img
                    style="display: block; width: 100%;"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s"
                    alt=""
                >
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
  