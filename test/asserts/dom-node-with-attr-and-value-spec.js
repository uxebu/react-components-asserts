import React from 'react/addons';
import assert from 'assert';
import {
  rendersDomNodeWithAttrAndValue,
  rendersNoDomNodeWithAttrAndValue
} from '../../src/dom-asserts.js';

describe('renders(No)DomNodeWithAttrAndValue', function() {
  
  describe('find a DOM node with `attr="value"`', function() {
    it('finds none', function() {
      const component = <b></b>;
      rendersNoDomNodeWithAttrAndValue(component, 'className', 'x');
    });
    it('finds a `className` in one DOM node', function() {
      const component = <b className="x"></b>;
      rendersDomNodeWithAttrAndValue(component, 'className', 'x');
    });
    it('finds a `className` in one DOM node of many', function() {
      const component = <div><b className="x"></b></div>;
      rendersDomNodeWithAttrAndValue(component, 'className', 'x');
    });
  });

  describe('assert function', function() {
    it('is silent when test passes', function() {
      const component = <b className="x"></b>;
      const fn = () => {
        rendersDomNodeWithAttrAndValue(component, 'className', 'x');
      };
      assert.doesNotThrow(fn);
    });
    describe('when it fails', function() {
      it('throws', function() {
        const component = <b></b>;
        const fn = () => {
          rendersDomNodeWithAttrAndValue(component, 'className', 'x');
        };
        assert.throws(fn);
      });
      it('throws right message', function() {
        const component = <b></b>;
        try {
          rendersDomNodeWithAttrAndValue(component, 'className', 'x');
        } catch (error) {
          assert.ok(error.message.startsWith('Expected'));
        }
      });
    });
  });
  
});
