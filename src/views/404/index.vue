<script setup>
import { useRouter } from "vue-router"


const router = useRouter()
const onGoBackTxtClicked = () => {
    router.push('/')
}

</script>

<template>
    <div class="card-container">
        <div class="img-container container-item">
            <img src="./../../assets/404.svg" />
        </div>
        <div class="txt-container container-item">
            <div class="code">
                404
            </div>
            <div class="message">
                你查看的页面貌似丢失了...
            </div>
            <div class="action" @click="onGoBackTxtClicked">
                返回首页，查看更多内容
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    width: 80%;
    max-width: 1000px;
    max-height: 500px;
    min-width: 600px;
    background-color: white;
    font-size: 0;
    border-radius: 20px;
    box-shadow: 0 0 50px 0 rgba(146, 146, 146, 0.63);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.card-container .container-item {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
}

.card-container .img-container {
    background-color: rgba(253, 216, 168, 0.692);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.card-container .img-container img {
    pointer-events: none;
    user-select: none;
}

.card-container .txt-container .code {
    font-size: clamp(150px, 20vw, 200px);
    font-family: 'Arial Narrow';
    color: rgb(86, 86, 253);
    font-weight: bolder;
    text-align: center;
}

.card-container .txt-container .message {
    font-size: 18px;
    text-align: center;
    font-weight: 200;
    margin-bottom: 20px;
}

.card-container .txt-container .action {
    font-size: 15px;
    font-weight: 200;
    text-align: center;
    text-decoration-line: underline;
    cursor: pointer;
}
</style>