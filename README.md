# React flow editor

example - https://voiso.github.io/react-flow-editor/

# Install

```bash
nvm install 20.5.1
nvm use
pnpm install
```

# React Flow Editor

This project uses **pnpm** as package manager.

## 🚀 Project Structure

Inside of project, you'll see the following folders:

```
/
├── packages/
│   ├── e2e/
│   ├── // e2e testing with Cypress
│   │   └── ...
│   │
│   ├── examples/
│   ├── // Example to see library in action
│   │   └── ...
│   │
│   └── react-flow-editor/
│   ├── // Core package
│       └── ...
│       └── package.json
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                              | Action                                      |
| :----------------------------------- | :------------------------------------------ |
| `pnpm install`                       | Installs dependencies                       |
| `pnpm --dir ./packages/examples dev` | Starts local dev server at `localhost:3000` |
| `pnpm run eslint`                    | Run eslint for lint all packages            |
| `pnpm run prettier`                  | Run prettier for lint all packages          |
| `pnpm run typescript`                | Run typescript for lint all packages        |

## 🎉 Publishing

To publish a new version of **react-flow-editor** create release

## 🏋🏻‍♀️ Main features

- DnD with right mouse down to move canvas
- Available autoScroll when DnD connection or nodes
- Multiple Selection with left mouse click with shift on nodes
- Multiple Selection with left mouse down and dragging select zone
- Delete (multiple too) selected nodes with DELETE/BACKSPACE
- DnD multiple selected nodes with left mouse down on selected nodes
- Scroll mouse to zoom
- Connectors could be disconnected from both edges
- Overview function to place all the nodes to viewPort

## ⌨️ Rules for node states

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
