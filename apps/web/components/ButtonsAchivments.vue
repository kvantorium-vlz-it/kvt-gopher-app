
<template>
    <div class="header">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle"></slot>
        </div>
        <div class="main">
            <slot name="main"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "left middle right main";
    gap: 16px;
}
.left {
    grid-area: left;
}
.middle {
    grid-area: middle;
}
.main {
    grid-area: main;
}
.right {
    grid-area: right;
}
</style>