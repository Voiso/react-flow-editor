import { atom } from "nanostores"

export enum AutoScrollDirection {
  right = "right",
  left = "left",
  top = "top",
  bottom = "bottom"
}

export type AutoScrollState = { speed: number; direction: AutoScrollDirection }

export const AutoScrollAtom = atom<Array<AutoScrollState>>([])
