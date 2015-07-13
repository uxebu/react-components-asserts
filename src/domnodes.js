import React from 'react/addons';
import DomNode from './domnode.js';
const TestUtils = React.addons.TestUtils;

export default class DomNodes {
  static fromRenderedTree(tree) {
    let instance = new DomNodes();
    instance.domNodes = allNodes(tree)
      .filter(DomNode.isDomNode)
      .map(domNode => DomNode.fromRenderedNode(domNode));
    return instance;
  }
  
  static fromComponent(component) {
    return DomNodes.fromRenderedTree(renderRecursively(component));
  }
}

function renderRecursively(componentToRender) {
  const rendered = render(componentToRender);
  if (rendered && rendered.props  && rendered.props.children){
    if (Array.isArray(rendered.props.children)) {
      rendered.props.children = rendered.props.children.map(renderRecursively);
    } else {
      rendered.props.children = [rendered.props.children].map(renderRecursively)[0];
    }
  }
  return rendered;
}

function render(componentToRender) {
  if (DomNode.isDomNode(componentToRender)) {
    return componentToRender;
  }
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(componentToRender);
  return shallowRenderer.getRenderOutput();
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
