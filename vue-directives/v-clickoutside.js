import Vue from 'vue';

const ctx = '@@clickoutsideContext';

Vue.directive('clickoutside', {
  bind(el, binding, vnode) {
    const documentHandler = function(e) {
      //子元素不包含在outside内
      if (!vnode.context || el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        el[ctx] = { //绑定值为context的属性在dom上
          documentHandler,
          methodName: binding.expression,
          bindingFn: binding.value
        };

        vnode.context[el[ctx].methodName](e);
      }
      //执行绑定在指令上的方法
      if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
        vnode.context[el[ctx].methodName]();
      } else {
        el[ctx].bindingFn && el[ctx].bindingFn(e);
      }
    }

    document.addEventListener('click', documentHandler);
  },
  update(el, binding, vnode) {
    if (el[ctx]) {
      el[ctx].methodName = binding.expression;
      el[ctx].bindingFn = binding.value;
    }
  },
  unbind(el, binding) {
    if (el[ctx]) {
      document.removeEventListener('click', el[ctx].documentHandler);
      delete el[ctx];
    }
  }
})