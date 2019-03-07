import Vue from 'vue'

const ctx = '@@nextfocusContext';

Vue.directive('nextfocus', {
  bind(el, binding, vnode) {
    el[ctx] = {
      inputs: [],
      l: 0,
      nextfocusHandler: null,
    }
    el[ctx].inputs = el.getElementsByTagName('input');
    el[ctx].l = el[ctx].inputs.length;
    for (let i = 0; i < el[ctx].l; i++) {
      el[ctx].inputs[i].setAttribute('nf-index', i)
    }
    const nextfocusHandler = function(event) {
      let key = event.which || event.keyCode;
      if (key === 13) {
        if (event.target.nodeName === 'INPUT') {
          let index = Number(event.target.getAttribute('nf-index')),
          nextindex = index + 1;
          if (nextindex && nextindex < el[ctx].l) {
            el[ctx].inputs[nextindex].focus();
            //console.log(el[ctx].inputs[nextindex])
            //if next input can not be focused (disble|readonly..)
            if (document.activeElement !== el[ctx].inputs[nextindex]) {
              do {
                nextindex++;
                el[ctx].inputs[nextindex].focus();
              } while ( nextindex < el [ ctx ].l && document.activeElement !== el[ctx].inputs[nextindex])
            }
          }
        }
      }
    }
    el[ctx].nextfocusHandler = nextfocusHandler;
    el.addEventListener('keyup', nextfocusHandler);
  },
  update(el, binding, vnode, oldVnode) {
    if (vnode.elm !== oldVnode.elm) {
      console.log('nextfocus change') el[ctx].inputs = el.getElementsByTagName('input');
      el[ctx].l = inputs.length;
      for (let i = 0; i < el[ctx].l; i++) {
        el[ctx].inputs[i].setAttribute('nf-index', i)
      }
    }
  },
  unbind(el, binding) {
    el.removeEventListener('keyup', el[ctx].nextfocusHandler);
    delete el[ctx];
  }
})