import { RootModel, selectors } from "../../../models"
import { CSSStyles } from "../constants"

export class CanvasModel extends RootModel {
  canvasPosition() {
    return this.getCanvas().then(($el) => $el.css(CSSStyles.transform))
  }
  canvasPositionOrigin() {
    return this.getCanvas().then(($el) => $el.css(CSSStyles.transformOrigin))
  }
  getCanvas() {
    return cy.get(selectors.ZOOM_CONTAINER)
  }
}

export const canvasModel = new CanvasModel()
