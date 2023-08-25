
<template>
  <terminal
    name="terminal"
    @exec-cmd="onExecCmd"
    show-header
    :init-log="null"
    context="/bian"
    :drag-conf="{width: 700, height: 500, init:{ x: 50, y: 50 }}">
  >
  </terminal>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import Terminal, {api as TerminalApi} from 'vue-web-terminal'

const	onExecCmd = (key: any, command: any, success: any, failed: any) => {
	// if (key === 'v') {
	// 	success({
	// 		type: 'html',
	// 		content: `
	//       <div class="test">
	//         <div class="body">
	//           <div class="guanjie">5</div>
	//           <div class="guanjie">2</div>
	//           <div class="guanjie">8</div>
	//           <div class="guanjie">9</div>
	//           <div class="guanjie">0</div>
	//           <div class="head">7</div>
	//         </div>
	//         <div class="hp">❤️</div>
	//       </div>
	//     `
	// 	})
	// 	return
	// }

	if (key === 'fail') {
		failed('Something wrong!!!')
	} else {
		const allClass = ['success', 'error', 'system', 'info', 'warning']

		const clazz = allClass[Math.floor(Math.random() * allClass.length)]
		success({
			type: 'normal',
			class: clazz,
			tag: '成功',
			content: command
		})
	}
}

onMounted(() => {
	const msg1 = {
		type: 'html',
		content: `
      <h2 class="info">VIRUS ATTACK !!!<h2>
    `
	}
	const msg2 = {
		type: 'html',
		content: `
        <div class="test">
          <div class="body">
            <div class="guanjie">5</div>
            <div class="guanjie">2</div>
            <div class="guanjie">8</div>
            <div class="guanjie">9</div>
            <div class="guanjie">0</div>
            <div class="head">7</div>
          </div>  
          <div class="hp">❤️</div>
        </div>
      `
	}
	setTimeout(() => {
		TerminalApi.pushMessage('terminal', msg1)
	}, 3500)
	setTimeout(() => {
		TerminalApi.pushMessage('terminal', msg2)
	}, 6000)
})

</script>

<style lang="less">
@keyframes flash {
  from {
    color: blue;
  }
  50% {
    color: green;
  }
  to {
    color: red;
  }
}

@keyframes move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(200px);
  }
}

@keyframes rudong1 {
  from {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rudong2 {
  from {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(10deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  animation-name: flash;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  font-size: 29px;
}

.test {
  position: relative;
  height: 200px;
  border: blue 1px solid;
  padding: 30px;

  .hp {
    position: absolute;
    right: 20px;
    font-size: 32px;
    color: #ceff00;
    top: 39px;
  }

  .body {
    transform: scale(0.8);
    display: flex;
    color: red;
    animation-name: move;
    animation-duration: 10s;
    animation-iteration-count: infinite;

    .head {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 12px;
      border: red 1px solid;

      &::before {
        content: 'v';
        position: absolute;
        bottom: -14px;
      }

      &::after {
        content: 'B';
        position: absolute;
        /* bottom: -14px; */
        right: -18px;
        font-size: 29px;
      }

      animation-name: rudong1;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }

    .guanjie {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 12px;
      border: red 1px solid;

      &::before {
        content: 'v';
        position: absolute;
        bottom: -14px;
      }
      &::after {
        content: '^';
        position: absolute;
        top: -14px;
      }

      &:nth-child(2n) {
        animation-name: rudong1;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }

      &:nth-child(2n - 1) {
        animation-name: rudong2;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>
