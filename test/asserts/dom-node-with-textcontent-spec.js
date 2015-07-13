import React from 'react/addons';
import assert from 'assert';
//import {
//  rendersDomNodeWithTextContent
//} from '../src/dom-asserts.js';

describe('renders(No)DomNodeWithTextContent', function() {
  
  describe('finds none', function() {
    it('there is none', function() {
      const component = <b></b>;
      rendersNoDomNodeWithTextContent(component, 'bold');
    });
    it('there is one, which should fail', function() {
      const component = <b>bold</b>;
      assert.throws(() => {
        rendersNoDomNodeWithTextContent(component, 'bold');
      });
    });
  });
  
  describe('finds some', function() {
    it('when its the only node', function() {
      const component = <b>bold</b>;
      rendersDomNodeWithTextContent(component, 'bold');
    });
    it('and has another sibling', function() {
      const component = <b>bold<b/></b>;
      rendersDomNodeWithTextContent(component, 'bold');
    });
  });
  
});

function _findsOne(component, textContent) {
  const domNodes = domNodesFromComponent(component);
  return domNodes.some(domNode => domNode.hasTextContent(textContent));
}
function rendersDomNodeWithTextContent(component, textContent) {
  var found = _findsOne(component, textContent);
  assert.equal(found, true);
}

function rendersNoDomNodeWithTextContent(component, textContent) {
  var found = _findsOne(component, textContent);
  assert.equal(found, false);
}

import {fromComponent} from '../../src/domnodes.js';
function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}
