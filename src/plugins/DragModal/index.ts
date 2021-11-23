import DragModal from './DragModal.vue';
function saveModalConfig(id: string, top: number, left: number) {
  const config = {
    top,
    left,
  };
  localStorage.setItem(`modal-${id}`, JSON.stringify(config));
}

export default {
  install: (app: any) => {
    app.component(DragModal.name, DragModal);

    app.directive('draw', {
      bind(el: any, bindding: any, vNode: any) {
        el.setAttribute('draggable', true);
        let left: number;
        let top: number;
        el._dragstart = function (event: MouseEvent) {
          const Parent = el.offsetParent;
          event.stopPropagation();
          left = event.clientX - el.offsetLeft - Parent.offsetLeft;
          top = event.clientY - el.offsetTop - Parent.offsetTop;
        };

        el._checkPosition = function () {
          const Parent = el.offsetParent;
          // 防止被拖出边界
          const width = Parent?.offsetWidth || 0;
          const height = Parent?.offsetHeight || 0;
          let leftnew = Math.min(
            Parent.offsetLeft,
            document.body.clientWidth - width
          );
          leftnew = Math.max(0, leftnew);
          let topnew = Math.min(
            Parent.offsetTop,
            document.body.clientHeight - height
          );
          topnew = Math.max(0, topnew);
          Parent.style.left = `${leftnew}px`;
          Parent.style.top = `${topnew}px`;
          saveModalConfig(vNode.context.cacheId, topnew, leftnew);
        };

        el._dragEnd = function (event: MouseEvent) {
          event.stopPropagation();
          left = event.clientX - left;
          top = event.clientY - top;

          const main = el.offsetParent;
          main.style.left = `${left}px`;
          main.style.top = `${top}px`;

          el._checkPosition();
        };

        el._documentAllowDraop = function (event: MouseEvent) {
          event.preventDefault();
        };

        document.body.addEventListener('dragover', el._documentAllowDraop);
        el.addEventListener('dragstart', el._dragstart);
        el.addEventListener('dragend', el._dragEnd);
        window.addEventListener('resize', el._checkPosition);
      },

      unbind(el: any) {
        document.body.removeEventListener('dragover', el._documentAllowDraop);
        el.removeEventListener('dragstart', el._dragstart);
        el.removeEventListener('dragend', el._dragEnd);
        window.removeEventListener('resize', el._checkPosition);
        delete el._documentAllowDraop;
        delete el._dragstart;
        delete el._dragEnd;
        delete el._checkPosition;
      },
    });
  },
};
