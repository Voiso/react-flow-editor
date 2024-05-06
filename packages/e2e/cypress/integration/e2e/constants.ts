export enum WheelDirection {
  top = "top",
  bottom = "bottom"
}

export const BROWSER_PX_DEVIATION = 1

export const ZOOM_PX_DEVIATION = 0.01

export const CLICK_COORDS = {
  FIRST_NODE: {
    X: 350,
    Y: 150
  },
  SECOND_NODE: {
    X: 550,
    Y: 350
  },
  THIRD_NODE: {
    X: 510,
    Y: 510
  }
}

export const KEY_CODE_BACK = "Backspace"
export const KEY_CODE_DELETE = "Delete"

export const CANVAS_ZONE_POINTS = {
  RIGHT: 999,
  TOP: 101,
  BOTTOM: 659,
  LEFT: 201
}

export const CANVAS_POINT = {
  X: 400,
  Y: 200
}

export enum NodeState {
  dragging = "dragging",
  draggingConnector = "draggingConnector",
  selected = "selected",
  disabled = "disabled"
}

export const ZOOM_IN_COUNT = 23
export const ZOOM_OUT_COUNT = 40

export enum CSSStyles {
  transform = "transform",
  transformOrigin = "transform-origin"
}
