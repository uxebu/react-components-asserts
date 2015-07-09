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

  describe('assert function', function() {
    it('is silent when test passes', function() {
      const component = <b className="x"></b>;
      const fn = () => {
        assertFunctions.rendersDomNodeWithAttrAndValue(component, 'className', 'x');
      };
      assert.doesNotThrow(fn);
    });
    describe('when it fails', function() {
      it('throws', function() {
        const component = <b></b>;
        const fn = () => {
          assertFunctions.rendersDomNodeWithAttrAndValue(component, 'className', 'x');
        };
        assert.throws(fn);
      });
      it('throws right message', function() {
        const component = <b></b>;
        try {
          assertFunctions.rendersDomNodeWithAttrAndValue(component, 'className', 'x');
        } catch (error) {
          assert.ok(error.message.startsWith('Expected'));
        }
      });
    });
  });
  
});

function rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
  let domNodes = domNodesFromComponent(component);
  return domNodes
    .some(domNode => domNode.hasAttributeWithValue(attributeName, expectedValue))
}

const assertFunctions = {
  rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue) {
    const found = rendersDomNodeWithAttrAndValue(component, attributeName, expectedValue);
    var message = `Expected \`${component.type.name || component.type}\` to render a DOM node with the attribute \`${attributeName}\` with value \`${expectedValue}\``;
    assert.ok(found, message);
  }
};

//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText
