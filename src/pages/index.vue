<script setup lang="ts">
import { ref, Ref, reactive, computed, nextTick } from 'vue';

const flow = reactive({
  typing: '',
  showButton: false,
  showColor: false,
  showLucky: false,
  showLast: false,
  showInfo: false,
});

const selected = reactive({
  in: '',
  color: '',
  lucky: '',
});

//fixed string
const str_time = ref('');
const questionStart = ref('');
const questionColor = ref('');
const questionLucky = ref('');

function startTypeLog(text: string, bind: Ref<string>, classFlag: string) {
  return new Promise((resolve, reject) => {
    let count = 0;
    flow.typing = classFlag;
    const tick = setInterval(() => {
      if (count <= text.length) {
        bind.value = text.substring(0, count);
        count++;
      } else {
        clearInterval(tick);
        flow.typing = '';
        resolve(true);
      }
    }, 50);
  });
}

onMounted(async () => {
  await startTypeLog(
    'The next game will start in 2021.12.12 20:00:00 GMT',
    str_time,
    'str_time'
  );
  await startTypeLog('Do you want to get in?', questionStart, 'questionStart');
  flow.showButton = true;
});

async function getInGame(selectIn: boolean) {
  if (selectIn) {
    selected.in = 'yes';

    if (!flow.showColor) {
      await startTypeLog(
        'Select your favrite color:',
        questionColor,
        'questionColor'
      );
    }

    // await nextTick();
    flow.showColor = true;
  } else {
    selected.in = 'no';
  }
}

async function selectColor(color: string) {
  if (color) {
    selected.color = color;

    if (!flow.showLucky) {
      await startTypeLog(
        'Select your lucky number:',
        questionLucky,
        'questionLucky'
      );
    }

    flow.showLucky = true;
  } else {
  }
}

async function selectLuckyNumber(num: string) {
  if (num) {
    selected.lucky = num;
    flow.showLast = true;
  } else {
  }
}

function chechTypingClass(name: string) {
  return flow.typing === name ? 'typing' : '';
}

function checkSelected(type: 'in' | 'color' | 'lucky', value: string) {
  return selected[type] === value ? 'selectedBtn' : '';
}
</script>

<template>
  <div>
    <div class="">
      <p>
        <span class="type-log" :class="chechTypingClass('str_time')">
          {{ str_time }}
        </span>
      </p>
      <p>
        <span :class="chechTypingClass('questionStart')">
          {{ questionStart }}</span
        >
      </p>
      <p class="py-5" v-show="flow.showButton">
        <span
          class="
            border-success-200
            p-1
            border-solid
            rounded-md
            border-2
            w-3
            px-3
            mx-5
            cursor-pointer
          "
          @click="getInGame(true)"
          :class="checkSelected('in', 'yes')"
          >YES</span
        >
        <span
          class="
            border-success-200
            p-1
            border-solid
            rounded-md
            border-2
            w-3
            px-3
            mx-5
            cursor-pointer
          "
          @click="getInGame(false)"
          :class="checkSelected('in', 'no')"
          >NO</span
        >
      </p>
      <div v-show="selected.in !== 'no'">
        <p>
          <span :class="chechTypingClass('questionColor')">{{
            questionColor
          }}</span>
          <span v-show="flow.showColor" class="flex flex-wrap">
            <span
              @click="selectColor('red')"
              class="
                border-success-200
                p-1
                border-solid
                rounded-md
                border-2
                px-3
                mx-5
                my-2
                cursor-pointer
                text-red-500
                select-none
              "
              :class="checkSelected('color', 'red')"
              >RED</span
            >
            <span
              @click="selectColor('green')"
              class="
                border-success-200
                p-1
                border-solid
                rounded-md
                border-2
                px-3
                mx-5
                my-2
                cursor-pointer
                text-green-500
                select-none
              "
              :class="checkSelected('color', 'green')"
              >GREEN</span
            >
            <span
              @click="selectColor('blue')"
              class="
                border-success-200
                p-1
                border-solid
                rounded-md
                border-2
                px-3
                mx-5
                my-2
                cursor-pointer
                text-blue-500
                select-none
              "
              :class="checkSelected('color', 'blue')"
              >BLUE</span
            >
          </span>
        </p>
        <div>
          <span :class="chechTypingClass('questionLucky')">{{
            questionLucky
          }}</span>
          <div v-show="flow.showLucky" class="flex flex-wrap">
            <span
              v-for="i in 10"
              :key="i"
              @click="selectLuckyNumber((i - 1).toString())"
              :class="checkSelected('lucky', (i - 1).toString())"
              class="
                border-success-200
                p-1
                border-solid
                rounded-md
                border-2
                px-3
                mx-5
                my-2
                cursor-pointer
                select-none
              "
              >{{ i - 1 }}</span
            >
          </div>
        </div>

        <div v-show="flow.showLast">
          <p class="pt-4">
            Connect to you wallet:
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
              >MetaMask(coming soon)</span
            >
          </p>

          <p>Good Lucky.</p>

          <div>--------------------------</div>

          <p>People was in: 1462</p>
          <p>Color Choose: red 462, green 600, blue 400</p>
          <p>Lucky number is same as you: 192</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes borders {
  from {
    border-color: rgb(255, 255, 255);
  }
  to {
    border-color: #fff;
  }
}

.type-log {
  /* white-space: nowrap; */
  overflow: hidden;
}
.typing {
  padding-right: 4px;
  border-right-width: 2px;
  border-right-style: solid;
  animation: borders linear 0.3s infinite normal;
}
.selectedBtn {
  background-color: #303030;
}
</style>
