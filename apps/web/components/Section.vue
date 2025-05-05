<template>
    <div class="section">
        <div class="heading">
            <slot name="heading"></slot>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>

.section{

}

.heading{
    font-size: 20px;
    margin-bottom: 16px;
}

.content{

}

</style>