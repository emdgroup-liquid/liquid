import MutationObserver from "mutation-observer";

let triggerableMutationObservers = [];
const TriggerableMutationObserver = function (cb) {
  const triggerableMutationObserver = new MutationObserver(cb);
  triggerableMutationObserver.trigger = cb;
  triggerableMutationObservers.push(triggerableMutationObserver);
  return triggerableMutationObserver;
};

global.MutationObserver = TriggerableMutationObserver as MutationObserver;

export function getTriggerableMutationObservers() {
  return triggerableMutationObservers;
}

export function clearTriggerableMutationObservers() {
  triggerableMutationObservers = [];
}
