import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {fromComponent} from '../src/domnodes.js';

function domNodesFromComponent(component) {
  return fromComponent(component).nodes;
}

describe('dom asserts', function() {
  
  describe('find a DOM node with `attr="value"`', function() {
    it('finds a `className` in one dom node', function() {
      const component = <b className="x"></b>;
      assert.ok(componentHasDomNodeWithAttrAndValue(component, 'className', 'x'));
    });
  });
});

function componentHasDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  let nodes = domNodesFromComponent(component);
  return nodes[0].props[attributeName] === expectedValue;
}


//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText
