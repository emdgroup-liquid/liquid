/* istanbul ignore file */

class RO {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
}

let triggerableResizeObserver;
const TriggerableResizeObserver = function (cb) {
  triggerableResizeObserver = new RO();
  triggerableResizeObserver.trigger = cb;
  return triggerableResizeObserver;
};

global.ResizeObserver = TriggerableResizeObserver as never;

export function getTriggerableResizeObserver() {
  return triggerableResizeObserver;
}
