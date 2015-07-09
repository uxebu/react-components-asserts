import React from 'react/addons';

export default class DomNodes {
  static fromRenderedTree(tree) {
    let domNodes = new DomNodes();
    domNodes.nodes = allNodes(tree).filter(isDomNode);
    return domNodes;
  }
}

const ensureToBeArray = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
const flatten = (arr, merged) => [...arr, ...merged];
const isDomNode = (node) => node.type in React.DOM;

function allChildren({props = {}}) {
  if (!props.children) {
    return [];
  }
  let children = ensureToBeArray(props.children);
  return [...children, ...children.map(allChildren).reduce(flatten)];
}

function allNodes(tree) {
  return [tree, ...allChildren(tree)];
}



//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText

//return (
//  <div className="email-item pure-g">
//    <a className="pure-u-3-4" href={newUrl}>
//      <h4 className="email-subject">{name}</h4>
//      <p className="email-desc">{description}</p>
//    </a>
//  </div>
//);
