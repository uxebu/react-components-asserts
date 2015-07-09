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

function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}

function _rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  let domNodes = domNodesFromComponent(component);
  return domNodes
    .some(domNode => domNode.hasAttributeWithValue(attributeName, expectedValue))
}


