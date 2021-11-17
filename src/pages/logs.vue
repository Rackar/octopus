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
      >Details</span
    >
    <div class="h-96 overflow-y-scroll">
      <transition-group
        name="staggered-fade"
        tag="ul"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-for="line in logs.address" :key="line.id">
          COLOR:{{ line.color }} {{ line.address }}
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, reactive, computed, nextTick } from 'vue';
// import gsap from "gsap";

const array = new Array(1000).fill(0).map((_, i) => {
  return {
    id: i,
    address: `0x09dsfdjlasfiwer0dfk${i.toString()}`,
    lucky: i % 10,
    color: i % 3 === 0 ? 'R' : i % 3 === 1 ? 'G' : 'B',
  };
});

const logs = reactive({
  address: array,
});

// function beforeEnter(el: any) {
//   el.style.opacity = 0
//   el.style.height = 0
// };
// function enter(el: any, done: gsap.Callback) {
//   gsap.to(el, {
//     opacity: 1,
//     height: '1.6em',
//     delay: el.dataset.index * 0.15,
//     onComplete: done
//   })
// };
// function leave(el: any, done: gsap.Callback) {
//   gsap.to(el, {
//     opacity: 0,
//     height: 0,
//     delay: el.dataset.index * 0.15,
//     onComplete: done
//   })
// }
</script>
