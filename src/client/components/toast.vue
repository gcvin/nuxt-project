<template>
    <div class="wrap" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">{{text}}</div>
</template>

<style scoped>
    .wrap {
        position: fixed;
        left: 50%;
        top: 50%;
        background: #000;
        padding: 10px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        color: #fff;
        opacity: .7;
    }
    .fadein {
        animation: fadein 0.25s;
    }
    .fadeout {
        animation: fadeout 0.25s;
        opacity: 0;
    }
    @keyframes fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: .7;
        }
    }
    @keyframes fadeout {
        0% {
            opacity: .7;
        }
        100% {
            opacity: 0;
        }
    }
</style>