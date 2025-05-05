<template>
    <div class="header">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle"></slot>
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
    grid-template-areas: "left middle middle right";
    gap: 16px;
}
.left {
    grid-area: left;
}
.middle {
    grid-area: middle;
}
.right {
    grid-area: right;
}
</style>