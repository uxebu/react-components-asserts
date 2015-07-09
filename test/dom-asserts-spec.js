import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {fromComponent} from '../src/domnodes.js';
import DomNode from '../src/domnode.js';

function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}

describe('dom asserts', function() {
  
  describe('find a DOM node with `attr="value"`', function() {
    it('finds none', function() {
      const component = <b></b>;
      assert.equal(rendersDomNodeWithAttrAndValue(component, 'className', 'x'), false);
    });
    it('finds a `className` in one DOM node', function() {
      const component = <b className="x"></b>;
      assert.equal(rendersDomNodeWithAttrAndValue(component, 'className', 'x'), true);
    });
    it('finds a `className` in one DOM node of many', function() {
      const component = <div><b className="x"></b></div>;
      assert.ok(rendersDomNodeWithAttrAndValue(component, 'className', 'x'));
    });
  });
});

function rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  let domNodes = domNodesFromComponent(component);
  return domNodes
    .some(domNode => domNode.hasAttributeWithValue(attributeName, expectedValue))
}


//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText
