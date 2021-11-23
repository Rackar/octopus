<template>
  <transition name="pop" appear>
    <div class="popup" v-if="activeComponent">
      <div class="popup-inner relative">
        <span
          class="
            select-none
            font-bold
            text-center
            hover:text-green-800
            w-8
            h-8
            absolute
            top-1
            right-1
            rounded-full
            cursor-pointer
          "
          @click="activeComponent = false"
          >×</span
        >
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Popup',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    TogglePopup: {
      type: Function,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    activeComponent: {
      get() {
        return this.modelValue;
      },
      set(v) {
        this.$emit('update:modelValue', v);
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-inner {
  background-color: #484848;
  border-radius: 4px;
  padding: 50px;
  max-width: 500px;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  /* transform: scale(0.3) translateY(-50%); */
}
</style>
