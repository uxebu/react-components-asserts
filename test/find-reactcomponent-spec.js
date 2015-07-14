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
    it('two, as siblings', function() {
      class Comp extends React.Component { render() { return <b/>; } }
      const component = <a><Comp/><Comp/></a>;
      
      assert.equal(findReactComponent(component).length, 2);
    });
  });
});

const ensureToBeArray = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
function findReactComponent(component) {
  const rendered = ReactComponent.render(component);
  return ensureToBeArray(rendered.props.children);
}