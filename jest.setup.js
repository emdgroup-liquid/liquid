class MockedEvent {
  type = undefined
  eventInitDict = undefined

  constructor(type, eventInitDict) {
    this.type = type
    this.eventInitDict = eventInitDict
  }
}

global.FocusEvent = MockedEvent
global.InputEvent = MockedEvent

global.requestAnimationFrame = (cb) => setTimeout(cb)
