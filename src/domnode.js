export default class DomNode {
  static fromRenderedNode(renderedNode) {
    let domNode = new DomNode();
    domNode._renderedNode = renderedNode;
    return domNode;
  }
  hasAttributeWithValue(attributeName, value) {
    return this._renderedNode.props[attributeName] === value;
  }
}
