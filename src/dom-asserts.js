import assert from 'assert';
import {fromComponent} from './domnodes.js';
import DomNode from './domnode.js';

export function rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  const found = _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue);
  var message = `Expected \`${component.type.name || component.type}\` to render a DOM node with the attribute \`${attributeName}\` with value \`${expectedValue}\``;
  assert.equal(found, true, message);
}
export function rendersNoDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  const anyFound = _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue);
  assert.equal(anyFound, false);
}
export function rendersDomNodeWithTextContent(component, textContent) {
  var found = _findsOneWithTextContent(component, textContent);
  assert.equal(found, true);
}
export function rendersNoDomNodeWithTextContent(component, textContent) {
  var found = _findsOneWithTextContent(component, textContent);
  assert.equal(found, false);
}


function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}
function _findsOneWithTextContent(component, textContent) {
  const domNodes = domNodesFromComponent(component);
  return domNodes.some(domNode => domNode.hasTextContent(textContent));
}
function _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  const domNodes = domNodesFromComponent(component);
  return domNodes
    .some(domNode => domNode.hasAttributeWithValue(attributeName, expectedValue))
}


