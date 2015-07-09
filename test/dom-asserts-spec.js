import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {fromComponent} from '../src/domnodes.js';

function domNodesFromComponent(component) {
  return fromComponent(component).nodes;
}

describe('dom asserts', function() {
  
  describe('find a DOM node with `attr="value"`', function() {
    it('finds a `className` in one DOM node', function() {
      const component = <b className="x"></b>;
      assert.ok(rendersDomNodeWithAttrAndValue(component, 'className', 'x'));
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
    .map(({props}) => props[attributeName])
    .some(value => value === expectedValue)
}


//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText
