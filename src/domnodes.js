import DomNode from './domnode.js';
import ReactComponent from './reactcomponent.js';
import Renderer from './renderer.js';

export default class DomNodes {
  
  static fromComponent(component) {
    const renderedTree = Renderer.withComponent(component).renderedTree();
    return DomNodes.fromRenderedTree(renderedTree);
  }
  
  static fromRenderedTree(renderedTree) {
    let instance = new DomNodes();
    instance.domNodes = flattenAllNodes(renderedTree)
      .filter(DomNode.isDomNode)
      .map(DomNode.fromRenderedNode);
    return instance;
    
  }
  
}

const ensureToBeArray = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
const flatten = (arr, merged) => [...arr, ...merged];

function allChildren({props = {}}) {
  if (!props.children) {
    return [];
  }
  let children = ensureToBeArray(props.children);
  let all = [];
  for (let i=0, l=children.length; i<l; i++) {
    all = [...all, children[i], ...ensureToBeArray(children[i]).map(allChildren).reduce(flatten)];
  }
  return all;
}

function flattenAllNodes(tree) {
  return [tree, ...allChildren(tree)];
}
