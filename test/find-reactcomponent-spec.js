import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import ReactComponent from '../src/reactcomponent.js';

function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
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

const ensureToBeArray = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
function findReactComponent(component) {
  return allReactComponents(component);
}

import DomNode from '../src/domnode.js';

function allReactComponents(componentToRender) {
  function renderRecursively(componentToRender) {
    const rendered = render(componentToRender);
    if (rendered && rendered.props  && rendered.props.children){
      if (Array.isArray(rendered.props.children)) {
        rendered.props.children = rendered.props.children.map(renderRecursively);
      } else {
        rendered.props.children = [rendered.props.children].map(renderRecursively)[0];
      }
    }
    return rendered;
  }
  
  function render(componentToRender) {
    if (DomNode.isDomNode(componentToRender)) {
      return componentToRender;
    }
    if (ReactComponent.isReactComponent(componentToRender)) {
      allReactComponents.push(componentToRender);
      return ReactComponent.render(componentToRender);
    }
    return componentToRender;
  }

  let allReactComponents = [];
  renderRecursively(componentToRender);
  return allReactComponents;
}