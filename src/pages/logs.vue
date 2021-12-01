<template>
  <div>
    <!-- <h3 class="text-2xl font-bold">game logs</h3> -->
    <div>1. 2021.11.11 08:00:00</div>
    <div class>
      You and 0xes4e...87ec, 0xireof..dsfoi, 0xdiekd...sdfo, summuy 1426 people
      entered this game.
    </div>
    <div class>
      Round 1. The right color is red. 1000 people died, 462 alive. You alive.
    </div>
    <div class>
      Round 2. The most lucky number is 5. 270 people died, 192 alive. You
      alive.
    </div>
    <div class>Round 3. The crypto chosen one is 0x03xd..sdf0. You alive.</div>
    <div>
      Congratulation! You can get you reward.
      <span
        class="
          line-through
          border-success-200
          p-1
          border-solid
          rounded-md
          border-2
          px-3
          mx-5
          cursor-pointer
          select-none
        "
        >MINT</span
      >
    </div>
    <div>--------------------------</div>
    <span
      class="
        border-success-200
        p-1
        border-solid
        rounded-md
        border-2
        px-3
        mx-5
        cursor-pointer
        select-none
      "
      @click="goDetails(0)"
      >Replay Details</span
    >
    <span>This match result is color: blue, lucky number:2</span>
    <div class="h-96 overflow-y-scroll md:w-3/6">
      <transition-group
        name="staggered-fade"
        tag="ul"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-for="line in logs.address"
          :key="line.id"
          :style="'color:' + line.color"
          :class="{ winner: line.address === logs.winner }"
          class="flex"
        >
          COLOR:{{ line.color }} Lucky:{{ line.lucky }} {{ line.address }}
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, reactive, computed, nextTick } from 'vue';
import gsap from 'gsap';

const array = new Array(1000).fill(0).map((_, i) => {
  return {
    id: i,
    address: `0x09dsfdjlasfiwer0dfk${i.toString()}`,
    lucky: (i % 10).toString(),
    color: i % 3 === 0 ? 'red' : i % 3 === 1 ? 'green' : 'blue',
  };
});

const logs = reactive({
  address: array,
  winner: '',
  animating: false,
});

function reinitLog(id: number) {
  console.log(id);
  logs.address = array;
  setWinner('');
}

async function goDetails(id: number) {
  console.log(id);
  if (logs.animating) {
    return;
  }

  reinitLog(id);

  logs.animating = true;
  await wait(1);
  logs.address = filterBannedColor('red');

  await wait(1.5);
  logs.address = filterBannedColor('green');

  await wait(2);
  logs.address = filterLucky('2');

  await wait(1.5);
  setWinner('0x09dsfdjlasfiwer0dfk2');
  logs.animating = false;
}

function wait(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, seconds * 1000);
  });
}

function setWinner(winner: string) {
  logs.winner = winner;
}

function filterBannedColor(bannedColor: string) {
  return logs.address.filter(line => line.color !== bannedColor);
}

function filterLucky(lucky: string) {
  return logs.address.filter(line => line.lucky === lucky);
}

function beforeEnter(el: any) {
  el.style.opacity = 0;
  el.style.height = 0;
}

function enter(el: any, done: gsap.Callback) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

function leave(el: any, done: gsap.Callback) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}
</script>
<style scoped>
.winner {
  font-weight: bold;
  border: 1px solid red;
}
</style>
