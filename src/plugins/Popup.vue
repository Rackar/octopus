<template>
  <transition name="pop" appear>
    <div class="popup">
      <div class="popup-inner">
        <slot />
        <div>
          <button class="popup-close" @click="TogglePopup">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { defineComponent } from 'vue';
export default {
  name: 'Popup',
  props: {
    TogglePopup: {
      type: Function,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {},
};
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-inner {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  max-width: 500px;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
