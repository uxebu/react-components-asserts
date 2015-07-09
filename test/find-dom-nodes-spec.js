import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {fromRenderedTree} from '../src/domnodes.js';

function domNodesFromRenderedTree(tree) {
  return fromRenderedTree(tree).nodes;
}

function render(componentToRender) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(componentToRender);
  return shallowRenderer.getRenderOutput();
}

describe('find dom nodes', function() {
  
  describe('finds the right number of nodes', function() {
    it('one', function() {
      let renderedTree = render(<b></b>);
      assert.equal(domNodesFromRenderedTree(renderedTree).length, 1);
    });
    it('two nodes, one nesting level deep', function() {
      let renderedTree = render(<div><b></b></div>);
      assert.equal(domNodesFromRenderedTree(renderedTree).length, 2);
    });
    it('if inner node is NOT a DOM node, it does not count', function() {
      class NotDomNode extends React.Component { render() { return null; } }
      let renderedTree = render(<div><NotDomNode></NotDomNode></div>);
      assert.equal(domNodesFromRenderedTree(renderedTree).length, 1);
    });
  });
  
  describe('returns all nodes', function() {
    it('for one node', function() {
      let renderedTree = render(<b></b>);
      assert.equal(domNodesFromRenderedTree(renderedTree)[0].type, 'b');
    });
    describe('nested nodes', function() {
      describe('two nodes, one level nesting', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = render(<div><b></b></div>);
          domNodes = domNodesFromRenderedTree(renderedTree);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the inner node', () => { assert.equal(domNodes[1].type, 'b'); });
      });
      describe('three nodes, two levels nesting', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = render(<div><b><span></span></b></div>);
          domNodes = domNodesFromRenderedTree(renderedTree);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the node on the first level', () => { assert.equal(domNodes[1].type, 'b'); });
        it('third node is the inner node', () => { assert.equal(domNodes[2].type, 'span'); });
      });
      describe('three nodes, one level nesting', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = render(<div><b></b><span></span></div>);
          domNodes = domNodesFromRenderedTree(renderedTree);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the 1st node on the first level', () => { assert.equal(domNodes[1].type, 'b'); });
        it('third node is the 2nd node on the first level', () => { assert.equal(domNodes[2].type, 'span'); });
      });
      describe('many DOM nodes, various nestings', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = render(
            <div>
              <div>
                <span></span><span></span>
              </div>
              <span></span>
              <span><b><a></a></b></span>
            </div>
          );
          domNodes = domNodesFromRenderedTree(renderedTree);
        });
        it('the count is correct', () => { assert.equal(domNodes.length, 8); });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('2nd node is `div`', () => { assert.equal(domNodes[1].type, 'div'); });
        it('3rd node is `span`', () => { assert.equal(domNodes[2].type, 'span'); });
        it('4th node is `span`', () => { assert.equal(domNodes[3].type, 'span'); });
        it('5th node is `span`', () => { assert.equal(domNodes[4].type, 'span'); });
        it('6th node is `span`', () => { assert.equal(domNodes[5].type, 'span'); });
        it('7th node is `b`', () => { assert.equal(domNodes[6].type, 'b'); });
      });
    });
  });
  
});
