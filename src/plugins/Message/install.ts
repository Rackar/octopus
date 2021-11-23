import TheMessage from './TheMessage.vue';
import { Plugin, App } from 'vue';
const Message: Plugin = {
  install: (app: App) => {
    const MessageBox = TheMessage; // 创建的是一个组件构造器，不是实例
    function showMessage(content: string, type = 'info', duration = 3000) {
      const msg = app.component(MessageBox.name);
      msg.data.visible = true;
      // const instance = new MessageBox({
      //   data() {
      //     return { content, type, duration };
      //   },
      // }).$mount();
      // document.body.appendChild(instance.$el); // 添加dom元素
      // app.config.globalProperties.nextTick(() => {
      //   // dom元素渲染完成后执行回调
      //   instance.$data.visible = true;
      // });
    }

    app.config.globalProperties.$message = showMessage;
    ['success', 'error', 'info'].forEach(type => {
      app.config.globalProperties.$message[type] = (
        content: string,
        duration = 3000
      ) => {
        return showMessage(content, type, duration);
      };
    });
  },
};

export default Message;
