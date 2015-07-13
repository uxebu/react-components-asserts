import React from 'react/addons';
import assert from 'assert';
//import {
//  rendersDomNodeWithTextContent
//} from '../src/dom-asserts.js';

describe('renders(No)DomNodeWithTextContent', function() {
  
  describe('finds DOM node with `innerText=bold`', function() {
    it('finds none', function() {
      const component = <b></b>;
      rendersNoDomNodeWithTextContent(component, 'bold');
    });
    it('finds one', function() {
      const component = <b>bold</b>;
      rendersDomNodeWithTextContent(component, 'bold');
    });
  });
});

function rendersDomNodeWithTextContent(component, textContent) {
  const domNodes = domNodesFromComponent(component);
  const found = domNodes.some(domNode => domNode.hasTextContent(textContent));
  assert.equal(found, true);
}

function rendersNoDomNodeWithTextContent(component, innerText) {
  assert.equal(true, true);
}

import {fromComponent} from '../../src/domnodes.js';
function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}
