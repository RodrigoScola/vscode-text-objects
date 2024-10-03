"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLargestMatches = filterLargestMatches;
exports.groupNodes = groupNodes;
const extension_1 = require("../extension");
const constants_1 = require("../constants");
// Define a function to calculate the size of a match based on its start and end positions.
function getMatchSize(match) {
    const captures = match.captures;
    const startNode = captures[0].node.startIndex;
    const endNode = captures[captures.length - 1].node.endIndex;
    return endNode - startNode;
}
function exists(captures, name) {
    for (const capture of captures) {
        if (capture.name === name) {
            return capture;
        }
    }
    return;
}
// Function to filter the largest matches
function filterLargestMatches(matches) {
    const idMap = new Map();
    return matches.reduce((filtered, match) => {
        for (const cap of match.captures) {
            if (idMap.has(cap.node.id)) {
                return filtered;
            }
            idMap.set(cap.node.id, match);
        }
        //checks if function is anonymous
        if (exists(match.captures, 'anonymous_function')) {
            filtered.push(match);
            return filtered;
        }
        // Extract the function name (or unique identifier) from the match
        const functionName = exists(match.captures, constants_1.NODES.FUNCTION_NAME)?.node.text || '';
        // Check if there is an existing match for the same function
        const existingMatch = filtered.find((f) => {
            const existingFunctionName = f.captures.find((capture) => capture.name === constants_1.NODES.FUNCTION_NAME)?.node.text || '';
            return existingFunctionName === functionName;
        });
        if (!existingMatch) {
            filtered.push(match);
            return filtered;
        }
        // Calculate the sizes
        const existingSize = getMatchSize(existingMatch);
        const currentSize = getMatchSize(match);
        if (currentSize > existingSize) {
            return filtered.map((f) => {
                const existingFunctionName = f.captures.find((capture) => capture.name === constants_1.NODES.FUNCTION_NAME)?.node.text || '';
                return existingFunctionName === functionName ? match : f;
            });
        }
        return filtered;
    }, []);
}
function groupNodes(matches) {
    const nodes = [];
    for (const match of matches) {
        match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
        const firstNode = match.captures.at(0);
        const lastNode = match.captures.at(-1);
        if (!firstNode || !lastNode) {
            continue;
        }
        const node = {
            startPosition: firstNode.node.startPosition,
            endPosition: lastNode.node.endPosition,
            startIndex: firstNode.node.startIndex,
            endIndex: firstNode.node.endIndex,
        };
        (0, extension_1.visualize)(node, node);
        nodes.push(node);
    }
    return nodes;
}
//# sourceMappingURL=nodes.js.map