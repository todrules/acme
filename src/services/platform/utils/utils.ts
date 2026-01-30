export function getCss(docEle: HTMLElement) {
  const css: {
    transform?: string;
    transition?: string;
    transitionDuration?: string;
    transitionDelay?: string;
    transitionTimingFn?: string;
    transitionStart?: string;
    transitionEnd?: string;
    transformOrigin?: string;
    animationDelay?: string;
  } = {};

  // transform
  let i: number;
  let keys = ['webkitTransform', '-webkit-transform', 'webkit-transform', 'transform'];

  for (i = 0; i < keys.length; i++) {
    if ((<any>docEle.style)[keys[i]] !== undefined) {
      css.transform = keys[i];
      break;
    }
  }

  // transition
  keys = ['webkitTransition', 'transition'];
  for (i = 0; i < keys.length; i++) {
    if ((<any>docEle.style)[keys[i]] !== undefined) {
      css.transition = keys[i];
      break;
    }
  }

  // The only prefix we care about is webkit for transitions.
  let isWebkit = css.transition.indexOf('webkit') > -1;

  // transition duration
  css.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';

  // transition timing function
  css.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';

  // transition delay
  css.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';

  // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
  css.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';

  // transform origin
  css.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';

  // animation delay
  css.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay');

  return css;
}


export function pointerCoord(ev: any): PointerCoordinates {
  if (ev) {
    let changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      let touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    let pageX = ev.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: ev.pageY };
    }
  }
  return { x: 0, y: 0 };
}

export function hasPointerMoved(threshold: number, startCoord: PointerCoordinates, endCoord: PointerCoordinates) {
  if (startCoord && endCoord) {
    const deltaX = (startCoord.x - endCoord.x);
    const deltaY = (startCoord.y - endCoord.y);
    const distance = deltaX * deltaX + deltaY * deltaY;
    return distance > (threshold * threshold);
  }
  return false;
}

export function isTextInput(ele: any) {
  return !!ele &&
    (ele.tagName === 'TEXTAREA' ||
      ele.contentEditable === 'true' ||
      (ele.tagName === 'INPUT' && !(NON_TEXT_INPUT_REGEX.test(ele.type))));
}

export const NON_TEXT_INPUT_REGEX = /^(radio|checkbox|range|file|submit|reset|color|image|button)$/i;


const SKIP_INPUT_ATTR = [
  'value', 'checked', 'disabled', 'readonly', 'placeholder', 'type', 'class', 'style', 'id', 'autofocus', 'autocomplete', 'autocorrect'
];

export function copyInputAttributes(srcElement: HTMLElement, destElement: HTMLElement) {
  const attrs = srcElement.attributes;
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (SKIP_INPUT_ATTR.indexOf(attr.name) === -1) {
      destElement.setAttribute(attr.name, attr.value);
    }
  }
}


export interface PointerCoordinates {
  x?: number;
  y?: number;
}

export function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }
  return JSON.stringify(a) === JSON.stringify(b);
}

export function debounce(fn: Function, wait: number, immediate: boolean = false): any {
  let timeout: number, args: any, context: any, timestamp: number, result: any;
  return function () {
    // @ts-ignore
    context = this;
    args = arguments;
    timestamp = Date.now();
    let later: any = function () {
      let last: any = Date.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) result = fn.apply(context, args);
      }
    };
    let callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) result = fn.apply(context, args);
    return result;
  };
}

export function normalizeURL(url: string): string {
  const ionic = (<any>window)['Ionic'];
  if (ionic && ionic.normalizeURL) {
    return ionic.normalizeURL(url);
  }
  return url;
}

export function defaults(dest: any, ..._args: any[]) {
  for (let i = arguments.length - 1; i >= 1; i--) {
    let source = arguments[i];
    if (source) {
      for (let key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }
  return dest;
}

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isNumber(val: any): val is number {
  return typeof val === 'number';
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function';
}

export function isDefined(val: any): boolean {
  return typeof val !== 'undefined';
}

export function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined';
}

export function isPresent(val: any): val is any {
  return val !== undefined && val !== null;
}

export function isBlank(val: any): val is null {
  return val === undefined || val === null;
}

export function isObject(val: any): val is Object {
  return typeof val === 'object';
}

export function isArray(val: any): val is any[] {
  return Array.isArray(val);
}

export function isPrimitive(val: any) {
  return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val));
}

export function isTrueProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
}

export function isCheckedProperty(a: any, b: any): boolean {
  if (a === undefined || a === null || a === '') {
    return (b === undefined || b === null || b === '');

  } else if (a === true || a === 'true') {
    return (b === true || b === 'true');

  } else if (a === false || a === 'false') {
    return (b === false || b === 'false');

  } else if (a === 0 || a === '0') {
    return (b === 0 || b === '0');
  }

  return (a == b); // tslint:disable-line
}

export type Side = 'left' | 'right' | 'start' | 'end';

export function reorderArray(array: any[], indexes: { from: number, to: number }): any[] {
  const element = array[indexes.from];
  array.splice(indexes.from, 1);
  array.splice(indexes.to, 0, element);
  return array;
}

export function removeArrayItem(array: any[], item: any) {
  const index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

export function swipeShouldReset(isResetDirection: boolean, isMovingFast: boolean, isOnResetZone: boolean): boolean {
  // The logic required to know when the sliding item should close (openAmount=0)
  // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
  // and it ended up being too complicated to be written manually without errors
  // so the truth table is attached below: (0=false, 1=true)
  // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
  //         0        |       0      |       0       ||    0
  //         0        |       0      |       1       ||    1
  //         0        |       1      |       0       ||    0
  //         0        |       1      |       1       ||    0
  //         1        |       0      |       0       ||    0
  //         1        |       0      |       1       ||    1
  //         1        |       1      |       0       ||    1
  //         1        |       1      |       1       ||    1
  // The resulting expression was generated by resolving the K-map (Karnaugh map):
  let shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
  return shouldClose;
}


/** @hidden */
const ASSERT_ENABLED = true;


/** @hidden */
function _runInDev(fn: Function) {
  if (ASSERT_ENABLED === true) {
    return fn();
  }
}

function _assert(actual: any, reason: string) {
  if (!actual && ASSERT_ENABLED === true) {
    let message = 'RECURRASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}

export function requestIonicCallback(functionToLazy: any) {
  if ('requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(functionToLazy);
  } else {
    return setTimeout(functionToLazy, 500);
  }
}

export { _assert as assert };

export { _runInDev as runInDev };

