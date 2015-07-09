export default class DomNode {
  static fromRenderedNode(renderedNode) {
    let domNode = new DomNode();
    domNode._renderedNode = renderedNode;
    return domNode;
  }
  hasAttribute(attributeName) {
    return attributeName in this._renderedNode.props;
  }
  getAttributeValue(attributeName) {
    return this._renderedNode.props[attributeName];
  }
  hasAttributeWithValue(attributeName, value) {
    return this.hasAttribute(attributeName) && 
      this.getAttributeValue(attributeName) === value;
  }
  get type() {
    return this._renderedNode.type;
  }
}
