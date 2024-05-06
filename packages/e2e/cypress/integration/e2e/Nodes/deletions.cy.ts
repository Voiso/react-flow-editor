import { CLICK_COORDS, KEY_CODE_BACK, KEY_CODE_DELETE } from "../constants"
import { CONTEXT } from "./constants"
import { nodesModel } from "./Nodes.model"

context(CONTEXT, () => {
  beforeEach(nodesModel.open)

  const checkNodesCount = (count: number) =>
    nodesModel.nodesElements().then(($el) => expect($el.get()).to.have.length(count))

  describe("Deletions", () => {
    it("Should not do anything without selected nodes", () => {
      cy.realPress(KEY_CODE_BACK)
      cy.realPress(KEY_CODE_DELETE)

      checkNodesCount(3)
    })

    it("Should delete single node on backspace", () => {
      nodesModel.getRoot().realClick({ x: CLICK_COORDS.SECOND_NODE.X, y: CLICK_COORDS.SECOND_NODE.Y })

      cy.realPress(KEY_CODE_BACK)
      checkNodesCount(2)
    })

    it("Should delete single node on delete", () => {
      nodesModel.getRoot().realClick({ x: CLICK_COORDS.SECOND_NODE.X, y: CLICK_COORDS.SECOND_NODE.Y })

      cy.realPress(KEY_CODE_DELETE)
      checkNodesCount(2)
    })

    it("Should  delete multiple nodes", () => {
      nodesModel.nodeClick(2)
      nodesModel.getNode(3).click({ shiftKey: true, force: true })

      cy.realPress(KEY_CODE_BACK)

      checkNodesCount(1)
    })

    it("Should not delete important nodes", () => {
      nodesModel.getRoot().realClick({ x: CLICK_COORDS.FIRST_NODE.X, y: CLICK_COORDS.FIRST_NODE.Y })

      cy.realPress(KEY_CODE_BACK)
      checkNodesCount(3)
    })

    it("Should not delete important nodes on multiple delete", () => {
      nodesModel.nodeClick(1)
      nodesModel.getNode(2).click({ shiftKey: true, force: true })

      cy.realPress(KEY_CODE_BACK)

      checkNodesCount(2)
    })
  })
})
