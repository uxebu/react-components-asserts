import React from 'react/addons';
import assert from 'assert';
import {
  rendersDomNodeWithTextContent,
  rendersNoDomNodeWithTextContent
} from '../../src/dom-asserts.js';

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

    describe('error message', function() {
      let errorMessage;
      const component = <b>bold</b>;
      beforeEach(function() {
        try {
          rendersNoDomNodeWithTextContent(component, 'bold');
        } catch (error) {
          errorMessage = error.message;
        }
      });
      it('starts with `Did NOT expect`', function() {
        assert.ok(errorMessage.startsWith('Did NOT expect'), 'Doesnt start with `Did NOT expect`.');
      });
      it('contains the component name in backticks', function() {
        const name = component.type;
        assert.ok(errorMessage.includes(`\`${name}\``), 'Doesn`t contain `<component name>`.');
      });
      it('contains `bold` in backticks', function() {
        assert.ok(errorMessage.includes('`bold`'), 'Doesn`t contain `\`bold\``.');
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

    describe('error message', function() {
      let errorMessage;
      const component = <b></b>;
      beforeEach(function() {
        try {
          rendersDomNodeWithTextContent(component, 'bold');
        } catch (error) {
          errorMessage = error.message;
        }
      });
      it('starts with `Expected`', function() {
        assert.ok(errorMessage.startsWith('Expected'), 'Doesnt start with `Expected`.');
      });
      it('contains the component name in backticks', function() {
        const name = component.type;
        assert.ok(errorMessage.includes(`\`${name}\``), 'Doesn`t contain `<component name>`.');
      });
      it('contains `bold` in backticks', function() {
        assert.ok(errorMessage.includes('`bold`'), 'Doesn`t contain `\`bold\``.');
      });
    });
  });

  describe('finds combined content', function() {
    it('e.g. <b>({one})</b>', function() {
      const number = 42;
      const component = <b>({number})</b>;
      rendersDomNodeWithTextContent(component, '(42)');
    });
  });
  
});
