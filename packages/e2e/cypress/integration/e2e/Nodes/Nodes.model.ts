import { RootModel, selectors } from "../../../models"
import { CSSStyles } from "../constants"
import { coordinatesFromMatrix } from "../helpers"

export class NodesModel extends RootModel {
  nodePosition(nodeNumber: number) {
    return this.getNode(nodeNumber).then(($el) => $el.css(CSSStyles.transform))
  }
  nodeClick(nodeNumber: number) {
    return this.getNode(nodeNumber).realClick()
  }
  nodePositionNumeric(nodeNumber: number) {
    return this.nodePosition(nodeNumber).then(coordinatesFromMatrix)
  }
  nodesElements() {
    return cy.get(selectors.NODE_ELEMENT)
  }
}

export const nodesModel = new NodesModel()
