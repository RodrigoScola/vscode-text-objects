"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextToPosition = nextToPosition;
exports.closestToPosition = closestToPosition;
exports.select = select;
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
function nextToPosition(nodes, index) {
    if (nodes.length === 0) {
        return undefined;
    }
    // let closestNode = nodes[0];
    let closestNode = undefined;
    let closestDistance = Infinity;
    //      Math.abs(index.line - closestNode.startPosition.row);
    //Math.abs(index.character - closestNode.startPosition.column);
    for (const node of nodes) {
        const start = node.startPosition;
        if (start.row > index.line) {
            continue;
        }
        if (start.row < index.line ||
            (start.row === index.line && start.column > index.character)) {
            continue;
        }
        // Calculate the distance to the cursor position
        const distance = Math.abs(index.line - start.row);
        //Math.abs(index.character - start.column);
        if (distance < closestDistance) {
            (0, extension_1.visualize)(node, node);
            closestNode = node;
            closestDistance = distance;
        }
    }
    return closestNode;
}
function closestToPosition(nodes, index) {
    if (nodes.length === 0) {
        return undefined;
    }
    // let closestNode = nodes[0];
    let closestNode = undefined;
    let closestDistance = Infinity;
    let isInside = false;
    for (const node of nodes) {
        const start = node.startPosition;
        const end = node.endPosition;
        let currentInside = false;
        // Check if the cursor is within the node's range
        if ((index.line > start.row || index.line === start.row) &&
            //index.character >= start.column)) &&
            (index.line < end.row || index.line === end.row)
        //  && index.character <= end.column))
        ) {
            isInside = true;
            closestNode = node;
        }
        if (start.row > index.line && isInside && !currentInside) {
            continue;
        }
        if (start.row < index.line || start.row === index.line) {
            continue;
        }
        // Calculate the distance to the cursor position
        const distance = Math.abs(index.line - start.row);
        //Math.abs(index.character - start.column);
        if (distance < closestDistance) {
            (0, extension_1.visualize)(node, node);
            closestNode = node;
            closestDistance = distance;
        }
    }
    return closestNode;
}
function select(startPos, endPos, editor) {
    const cursor = editor.selection.active;
    editor.selection = new vscode_1.Selection(startPos, endPos); // Move cursor to that position
    editor.document.lineCount;
    const delta = Math.abs(cursor.line - editor.selection.active.line);
    let revealType = vscode_1.TextEditorRevealType.Default;
    if (delta > editor.document.lineCount) {
        revealType = vscode_1.TextEditorRevealType.InCenter;
    }
    editor.revealRange(new vscode_1.Range(startPos, endPos), revealType);
    return editor;
}
//# sourceMappingURL=selection.js.map