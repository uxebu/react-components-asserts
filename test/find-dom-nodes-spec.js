import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

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
    it('inner node is NOT a DOM node', function() {
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
    });
  });
  
});

function allChildrenFromRenderedTree(children) {
  if (!children) {
    return [];
  }
  if (Array.isArray(children)) {
    return [...children];
  }
  return [children, ...allChildrenFromRenderedTree(children.props.children)];
}
function allNodes(tree) {
  return [tree, ...allChildrenFromRenderedTree(tree.props.children)];
}
const isDomNode = (node) => node.type in React.DOM;
function domNodesFromRenderedTree(tree) {
  return allNodes(tree)
    .filter(isDomNode);
}

function render(componentToRender) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(componentToRender);
  return shallowRenderer.getRenderOutput();
}


//rendersDomNodeAttributeWithValue
//rendersDomNodeWithInnerText

//return (
//  <div className="email-item pure-g">
//    <a className="pure-u-3-4" href={newUrl}>
//      <h4 className="email-subject">{name}</h4>
//      <p className="email-desc">{description}</p>
//    </a>
//  </div>
//);
