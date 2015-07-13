import assert from 'assert';
import {fromComponent} from './domnodes.js';
import DomNode from './domnode.js';

export function rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  const found = _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue);
  const message = `Expected \`${component.type.name || component.type}\` to render a DOM node with the attribute \`${attributeName}\` with value \`${expectedValue}\``;
  assert.equal(found, true, message);
}
export function rendersNoDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  const anyFound = _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue);
  assert.equal(anyFound, false);
}
export function rendersDomNodeWithTextContent(component, textContent) {
  const found = _findsOneWithTextContent(component, textContent);
  const message = `Expected \`${component.type.name || component.type}\` to contain text content \`${textContent}\`.`;
  assert.equal(found, true, message);
}
export function rendersNoDomNodeWithTextContent(component, textContent) {
  const found = _findsOneWithTextContent(component, textContent);
  const message = `Did NOT expect \`${component.type.name || component.type}\` to contain text content \`${textContent}\`.`;
  assert.equal(found, false, message);
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


