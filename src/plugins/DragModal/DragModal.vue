<template>
  <transition name="pop" appear v-on:after-enter="afterEnter">
    <div
      v-if="activeComponent"
      id="drag"
      ref="drag"
      class="drag-modal-main"
      :style="{
        top: cacheTop + 'px',
        left: cacheLeft + 'px',
        width: width + 'px',
        height: height + 'px',
      }"
    >
      <div v-draw class="drag-title">{{ title }}</div>
      <div class="closeBtn" @click="closeComponent">x</div>
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
function saveModalConfig(id: string, top: number, left: number) {
  const config = {
    top,
    left,
  };
  localStorage.setItem(`modal-${id}`, JSON.stringify(config));
}

function getModalConfig(id: string) {
  if (id) {
    const config = localStorage.getItem(`modal-${id}`);
    let obj: any;
    if (config) {
      obj = JSON.parse(config);
    }

    return obj || null;
  } else {
    return null;
  }
}

export default defineComponent({
  name: 'DragModal',
  props: {
    value: Boolean,
    config: Object,
    cacheId: String,
    ifCacheDragPosition: { type: Boolean, default: true },
    top: { type: Number, default: 400 },
    left: { type: Number, default: 500 },
    width: { type: Number, default: 400 },
    height: { type: Number, default: 300 },
    title: { type: String, default: '标题' },
  },
  computed: {
    activeComponent: {
      get() {
        return this.value;
      },
      set(v: any) {
        this.$emit('input', v);
      },
    },
  },
  watch: {
    cacheId: {
      // immediate: true,
      handler(newid) {
        this.reloadCache(newid);
      },
    },

    left: {
      // immediate: true,
      handler(newid) {
        this.reloadCache(newid);
      },
    },
  },
  mounted() {
    this.reloadCache(this.cacheId || '');
  },
  data() {
    return {
      enameVisible: false,
      cacheLeft: 0,
      cacheTop: 0,
    };
  },
  methods: {
    closeComponent() {
      this.activeComponent = false;
      this.$emit('close');
    },
    checkPosition() {
      const Parent: HTMLElement = this.$refs.drag as HTMLElement;
      // 防止被拖出边界
      const width = Parent?.offsetWidth || 0;
      const height = Parent?.offsetHeight || 0;
      let leftnew = Math.min(this.left, document.body.clientWidth - width);
      leftnew = Math.max(0, leftnew);
      let topnew = Math.min(this.top, document.body.clientHeight - height);
      topnew = Math.max(0, topnew);

      this.cacheTop = topnew;
      this.cacheLeft = leftnew;
    },
    reloadCache(cacheId: string) {
      this.$nextTick(() => {
        const position = this.ifCacheDragPosition
          ? getModalConfig(cacheId)
          : null;
        if (!position) {
          this.cacheTop = this.top;
          this.cacheLeft = this.left;
          this.checkPosition();
        } else {
          const { top, left } = position;
          if (!top && top !== 0) {
            this.cacheTop = this.top;
          } else {
            this.cacheTop = top;
          }

          if (!left && left !== 0) {
            this.cacheLeft = this.left;
          } else {
            this.cacheLeft = left;
          }
        }
      });
    },
    afterEnter() {
      console.log('过渡完成');
      this.$emit('transEnd');
    },
  },
});
</script>

<style scoped>
.drag-modal-main {
  background-color: rgb(172, 14, 14);
  /* background: url(../../assets/img/index/popup.png) center center no-repeat; */
  background-size: 100% 100%;
  position: fixed;
  z-index: 1000;
  border-radius: 10px;
  overflow: visible;
}
.drag-title {
  cursor: move;
  padding: 16px 36px;
  font-size: 15px;
  color: #a5dbff;
}
.closeBtn {
  position: absolute;
  padding: 8px 14px;
  top: 0;
  right: 2px;
  cursor: pointer;
  font-size: 20px;
  color: #a5dbff;
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
