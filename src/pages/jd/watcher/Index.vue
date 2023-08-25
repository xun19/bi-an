<template>
    <div class="face">
        <div class="eye"></div>
        <div class="eye"></div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
onMounted(() => {
	const eye = document.querySelectorAll('.eye')
	window.addEventListener('mousemove', event => {
		eye.forEach(eye => {
			const angle = Math.atan2(event.pageX - eye.getBoundingClientRect()
				.left - eye.clientLeft / 2, event.pageY - eye.getBoundingClientRect().top
            - eye.clientTop / 2)
			const rot = angle * 180 / Math.PI * -1 - 90
			eye.style.transform = `rotate(${rot}deg)`
		})
	})
})
/* https://blog.csdn.net/luo1831251387/article/details/115283955 */
</script>

<style scoped>
    .face{
       position: relative;
       width: 200px;
       height: 200px;
       border-radius: 50%;
       /* background: linear-gradient(180deg,rgb(252, 207, 5) ,rgb(255, 240, 36)); */
       position: relative;
       box-shadow: inset 0 0 3px rgb(15, 15, 9),
       inset 0 0 5px rgb(15, 15, 9);

    }
    .face::after{
        display: none;
        content: '';
        position: absolute;
        bottom: 12%;
        left: 50%;
        transform: translateX(-50%);
        width: 90px;
        height: 40px;
        background-color: rgb(255, 199, 45);
        border-radius:  0 0 70px 70px;
        box-shadow: inset 0 0 5px rgb(53, 53, 53);
    }

     .eye{
         position: absolute;
         width: 60px;
         height: 60px;
         border-radius: 50%;
         background-color: #fff;
         box-shadow: inset 0 0 5px rgb(58, 58, 58);
     }
     .eye::after{
         content: '';
         color: whiter;
         position: absolute;
         top: 50%;
         left: 5%;
         transform: transLateY(-50%);
         width: 50%;
         height: 50%;
         background-color: #000;
         border-radius: 50%;
         box-shadow: inset 0 0 3px white,
         inset 0 0 5px white;
     }
     .face .eye:nth-child(1){
         top: 26%;
         left: 12%;
     }
     .face .eye:nth-child(2){
         top: 26%;
         right: 12%;
     }
</style>
