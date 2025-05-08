<template>
    <div class="main">
        <TheHeader/>
        <div class="display">
            <HomeHeader>
                <template #left>

                    <MenuButton title="">
                        <template #icon>
                            <Icon name=""/>
                        </template>
                    </MenuButton>

                </template>
                <template #middle>
                        <MenuButton title="">
                        <template #icon>
                            <Icon name=""/>
                        </template>
                    </MenuButton>

                </template>
            <template #right>
                    <MenuButton title="">
                    <template #icon>
                            <Icon name=""/>
                        </template>
                    </MenuButton>
            </template>

        </HomeHeader>
        
        <Section class="city-section">
            твой чушпан
            <div>
                <img src="https://img.pikbest.com/png-images/qiantu/original-cute-cartoon-gopher_2736241.png!sw800" alt="" width="208">
            </div>
        </Section>
        
        <Section class="story-section">
            статистика
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c1904VH9PR2xYqTgQ0YAg9sSj2UAXtrbtQ&s" alt="">
            </div>
            <div>

            </div>
        </Section>

      </div>
    </div>
</template>
  
<style scoped>
.main {
    gap: 16px;
    display: flex;
    flex-direction: column;
    font-size: 20px;
}

.display{
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0px 20px;
}

</style>
  