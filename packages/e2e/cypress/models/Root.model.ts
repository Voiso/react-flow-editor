import { WheelDirection } from "../integration/e2e/constants"
import selectors from "./selectors"

export class RootModel {
  open() {
    cy.visit(Cypress.env("HOST"))
    cy.wait(100)
  }
  getRoot() {
    return cy.get(selectors.ROOT)
  }
  mouseDown(x: number, y: number) {
    return this.getRoot().realMouseDown({ position: { x, y } })
  }
  mouseUp(x: number, y: number) {
    return this.getRoot().realMouseUp({ position: { x, y } })
  }
  dnd(fromX: number, fromY: number, toX: number, toY: number) {
    return this.getRoot()
      .realMouseDown({ position: { x: fromX, y: fromY } })
      .realMouseMove(toX, toY)
      .realMouseUp({ position: { x: toX, y: toY } })
  }
  dndWithDelayUp(fromX: number, fromY: number, toX: number, toY: number, delay?: number) {
    return this.getRoot()
      .realMouseDown({ position: { x: fromX, y: fromY } })
      .realMouseMove(toX, toY)
      .wait(delay || 100)
      .realMouseUp({ position: { x: toX, y: toY } })
  }
  wheel(direction: WheelDirection) {
    this.getRoot().trigger("wheel", { deltaY: direction === WheelDirection.top ? 1 : -1 })
  }
  wheelDirection(items: Array<WheelDirection>) {
    items.forEach((direction) => this.wheel(direction))
  }
  getNode(nodeNumber: number) {
    return cy.get(selectors.SINGLE_NODE + nodeNumber)
  }
  getNodeElement(nodeNum: number) {
    return this.getNode(nodeNum).find(selectors.NODE_ELEMENT)
  }
}
