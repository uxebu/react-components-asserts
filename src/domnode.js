import React from 'react/addons';

export default class DomNode {
  static fromRenderedNode(renderedNode) {
    let domNode = new DomNode();
    domNode._renderedNode = renderedNode;
    return domNode;
  }
  static isDomNode(node) {
    return node && node.type in React.DOM;
  }
  
  get type() {
    return this._renderedNode.type;
  }
  
  hasAttribute(attributeName) {
    return attributeName in this._renderedNode.props;
  }
  hasTextContent(textContent) {
    const children = this._renderedNode.props.children;
    if (Array.isArray(children)) {
      if (children.join('') === textContent) {
        // e.g. ['(', '42', ')'] is checked as '(42)'
        return true;
      }
      return children.some(child => child === textContent);
    }
    return children === textContent;
  }
  getAttributeValue(attributeName) {
    return this._renderedNode.props[attributeName];
  }
  hasAttributeWithValue(attributeName, value) {
    return this.hasAttribute(attributeName) && 
      this.getAttributeValue(attributeName) === value;
  }
}
