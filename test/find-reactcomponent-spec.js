import assert from 'assert';
import React from 'react/addons';
import Renderer from '../src/renderer.js';

function findReactComponent(component) {
  let renderer = Renderer.withComponent(component);
  return renderer.allReactComponents();
}

describe('find react components', function() {

  describe('the right amount', function() {
    it('one', function() {
      class Comp extends React.Component { render() { return <b/>; } }
      const component = <a><Comp/></a>;
      
      assert.equal(findReactComponent(component).length, 1);
    });
    describe('two', function() {
      class Comp extends React.Component { render() { return <b/>; } }
      it('as siblings', function() {
        const component = <a><Comp/><Comp/></a>;
        
        assert.equal(findReactComponent(component).length, 2);
      });
      it('nested inside each other', function() {
        class Comp extends React.Component { render() { 
          return <b>{this.props.children}</b>; 
        } }
        class Inner extends React.Component { render() { return <span/>; } }
        const component = <a><Comp><Inner/></Comp></a>;
        
        assert.equal(findReactComponent(component).length, 2);
      });
    });
  });
});
