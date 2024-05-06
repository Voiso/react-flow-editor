import { clamp } from "lodash"

import { ZOOM_MAX, ZOOM_MIN } from "../constants"

export const clampZoom = (newZoom: number): number => clamp(newZoom, ZOOM_MIN, ZOOM_MAX)
