# Flow Editor

## Main features

- DnD to move canvas or nodes
- Available autoScroll when DnD connection or nodes
- Multiple Selection with SHIFT + click nodes
- Multiple Selection with SHIFT and dragging select zone
- Delete (multiple too) selected nodes with DELETE/BACKSPACE
- DnD multiple selected nodes with SHIFT
- Scroll mouse to zoom
- Connectors could be disconnected from both edges
- Overview function to place all the nodes to viewPort

#### Rules for node states

1. node mouseDown = no changes in state
2. node mouseDown -> mouseUp = `selected`
3. node mouseDown -> mouseMove = `dragging`
4. node mouseDown -> mouseMove -> mouseUp = `null`

5. SHIFT + node mouseDown = no changes in state
6. SHIFT + (node mouseDown -> mouseUp) = `selected`
7. SHIFT + (node mouseDown-> mouseMove) = `dragging`
8. SHIFT + (node mouseDown-> mouseMove -> mouseUp) = `selected`

9. SHIFT + (node click -> node_2 click) = `selected` both
10. SHIFT + (node click -> node_2 click -> (node or node_2) mouseDown -> mouseMove) = `dragging` both
11. SHIFT + (node click -> node_2 click -> (node or node_2) mouseDown -> mouseMove -> mouseUp) = `selected` both

12. DnD from node_1 point = `draggingConnector`
13. DnD from node_1 point over node_2 point = node_1 `draggingConnector` and node_2 `connectorHovered`
14. DnD from node_1 point drop in any place = `null` for all

15. click away from nodes = `null` for all

### [Changelog](./changelog.md "Changelog")
