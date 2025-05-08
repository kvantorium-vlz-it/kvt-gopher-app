<template>
    <div class="main">
        <TheHeader username="sadads" />
        <div class="cituselect">
            <a href="" style="text-decoration: none;">
                выбор города здесь
            </a>
        </div>
        <div class="display">

            <Section class="story-section">
                статистика
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c1904VH9PR2xYqTgQ0YAg9sSj2UAXtrbtQ&s" alt="">
                </div>
            </Section>

            <Section class="city-section">
                твой чушпан
                <div>
                    <img src="https://img.pikbest.com/png-images/qiantu/original-cute-cartoon-gopher_2736241.png!sw800" alt="" width="208">
                </div>
            </Section>

            <Section class="achievements">
                <div class="achievements-header">
                    <div class="achievements-header-left">
                        достижения
                    </div>
                    <div class="achievements-header-right">
                        <a style="text-decoration: none;" href="???">        <!-- А куда??? -->
                            смотреть всё>
                        </a>
                    </div>
                </div>
                <div class="blocks">
                    <CityArea/>
                    <CityArea/>
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

.cituselect{
  position: absolute;
  left: 70%;
  top: 90px;
  font-size: 8.26px;
  background-color: #D9D9D9;
  padding: 4px 2px 6px 3px;
}

.display{
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0px 20px;
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

</style>
  