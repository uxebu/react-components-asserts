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

function _renderIfNeeded(component) {
  if (DomNode.isDomNode(component)) {
    return component;
  }
  const prototypeOfComponent = Reflect.getPrototypeOf(component.type);
  if (Object.is(prototypeOfComponent, React.Component)) {
    return render(component);
  }
}

function renderRecursively(componentToRender) {
  const rendered = render(componentToRender);
  if (rendered.props  && rendered.props.children){
    if (Array.isArray(rendered.props.children)) {
      rendered.props.children = rendered.props.children.map(_renderIfNeeded);
    } else {
      rendered.props.children = [rendered.props.children].map(_renderIfNeeded)[0];
    }
  }
  return rendered;
}

function render(componentToRender) {
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
