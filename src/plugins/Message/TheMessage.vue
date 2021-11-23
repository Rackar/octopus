<template>
  <transition name="slide">
    <div v-if="$data.visible" class="message-wrap" :class="type">
      <div class="content">{{ content }}</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Message',
  data() {
    return {
      content: '',
      visible: false,
      type: 'info', // 'success','error'
      duration: 3000,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
  },
});
</script>
<style scoped>
.message-wrap {
  position: fixed;
  background-color: #44b0f3;
  color: #ffffff;
  left: 40%;
  width: 20%;
  top: 25px;
  min-height: 40px;
  z-index: 1001;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #ebeef5;
}

.message-wrap .content {
  line-height: 40px;
}
.error {
  background-color: #fef0f0;
  color: #f56c6c;
}
.info {
  background-color: #f0f9eb;
  color: #0994e4;
}
.success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
