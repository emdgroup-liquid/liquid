import MutationObserver from 'mutation-observer'

let triggerableMutationObserver
const TriggerableMutationObserver = function (cb) {
  triggerableMutationObserver = new MutationObserver(cb)
  triggerableMutationObserver.trigger = cb
  return triggerableMutationObserver
}

global.MutationObserver = TriggerableMutationObserver as MutationObserver

export function getTriggerableMutationObserver() {
  return triggerableMutationObserver
}
