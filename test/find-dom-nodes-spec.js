import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {fromComponent} from '../src/domnodes.js';

function domNodesFromComponent(component) {
  return fromComponent(component).domNodes;
}

describe('find dom nodes', function() {
  
  describe('finds the right number of nodes', function() {
    it('one', function() {
      assert.equal(domNodesFromComponent(<b></b>).length, 1);
    });
    it('two nodes, one nesting level deep', function() {
      assert.equal(domNodesFromComponent(<div><b></b></div>).length, 2);
    });
    it('if inner node is NOT a DOM node, it does not count', function() {
      class NotDomNode extends React.Component { render() { return null; } }
      let component = <div><NotDomNode></NotDomNode></div>;
      assert.equal(domNodesFromComponent(component).length, 1);
    });
  });
  
  describe('returns all nodes', function() {
    it('for one node', function() {
      assert.equal(domNodesFromComponent(<b></b>)[0].type, 'b');
    });
    describe('nested nodes', function() {
      describe('two nodes, one level nesting', function() {
        let domNodes;
        beforeEach(function() {
          domNodes = domNodesFromComponent(<div><b></b></div>);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the inner node', () => { assert.equal(domNodes[1].type, 'b'); });
      });
      describe('three nodes, two levels nesting', function() {
        let domNodes;
        beforeEach(function() {
          let component = <div><b><span></span></b></div>;
          domNodes = domNodesFromComponent(component);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the node on the first level', () => { assert.equal(domNodes[1].type, 'b'); });
        it('third node is the inner node', () => { assert.equal(domNodes[2].type, 'span'); });
      });
      describe('three nodes, one level nesting', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = <div><b></b><span></span></div>;
          domNodes = domNodesFromComponent(renderedTree);
        });
        it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
        it('second node is the 1st node on the first level', () => { assert.equal(domNodes[1].type, 'b'); });
        it('third node is the 2nd node on the first level', () => { assert.equal(domNodes[2].type, 'span'); });
      });
      describe('many DOM nodes, various nestings', function() {
        let domNodes;
        beforeEach(function() {
          let renderedTree = (
            <div>
              <p>
                <a/><b/>
              </p>
              <span></span>
              <blockquote><form><button/></form></blockquote>
            </div>
          );
          domNodes = domNodesFromComponent(renderedTree);
        });
        describe('the order should be depth first', function() {
          it('the count is correct', () => { assert.equal(domNodes.length, 8); });
          it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
          it('2nd node is `p`', () => { assert.equal(domNodes[1].type, 'p'); });
          it('3rd node is `a`', () => { assert.equal(domNodes[2].type, 'a'); });
          it('4th node is `b`', () => { assert.equal(domNodes[3].type, 'b'); });
          it('5th node is `span`', () => { assert.equal(domNodes[4].type, 'span'); });
          it('6th node is `blockquote`', () => { assert.equal(domNodes[5].type, 'blockquote'); });
          it('7th node is `form`', () => { assert.equal(domNodes[6].type, 'form'); });
          it('8th node is `button`', () => { assert.equal(domNodes[7].type, 'button'); });
        });
      });

      describe('node that has an innerText', function() {
        it('1st node is `b`', () => {
          let domNodes = domNodesFromComponent(<b>bold</b>);
          assert.equal(domNodes[0].type, 'b');
        });
      });
    });
  });

  describe('finds in nested components', function() {
    class InnerComponent extends React.Component { render() { return <span></span>; } }
    describe('one nesting level deep', function() {
      it('inside is a react component', function() {
        assert.equal(domNodesFromComponent(<b><InnerComponent/></b>).length, 2);
      });
      it('different children', function() {
        assert.equal(domNodesFromComponent(<b><b></b><InnerComponent/></b>).length, 3);
      });
      it('multiple different children', function() {
        assert.equal(domNodesFromComponent(<b><b/><InnerComponent/><b/><InnerComponent/></b>).length, 5);
      });
    });
    
    describe('multiple nesting levels', function() {
      it('two levels', function() {
        assert.equal(domNodesFromComponent(<b><span><InnerComponent/></span></b>).length, 3);
      });
      
      it('multiple nesting of components', function() {
        class MultiComponent extends React.Component { render() { return <span><InnerComponent/><b/></span>; } }
        assert.equal(domNodesFromComponent(<b><span><MultiComponent/></span></b>).length, 5);
      });
    });
    
    describe('ensure order in rendered tree', function() {
      class FirstLevel extends React.Component { render() { return (<h1></h1>); } }
      class SecondLevel extends React.Component { render() { return <p><FirstLevel/><b/></p>; } }
      let domNodes;
      beforeEach(function() {
        let renderedTree = (
          <div>
            <span><FirstLevel/><a/></span>
            <SecondLevel/>
            <blockquote><SecondLevel/><FirstLevel/></blockquote>
          </div>
        );
        domNodes = domNodesFromComponent(renderedTree);
      });
      it('the count is correct', () => { assert.equal(domNodes.length, 12); });
      it('first node is the outer node', () => { assert.equal(domNodes[0].type, 'div'); });
      it('3rd node is `span`', () => { assert.equal(domNodes[1].type, 'span'); });
      it('4th node is `h1`', () => { assert.equal(domNodes[2].type, 'h1'); });
      it('5th node is `a`', () => { assert.equal(domNodes[3].type, 'a'); });
      it('6th node is `p`', () => { assert.equal(domNodes[4].type, 'p'); });
      it('7th node is `h1`', () => { assert.equal(domNodes[5].type, 'h1'); });
      it('8th node is `b`', () => { assert.equal(domNodes[6].type, 'b'); });
      it('9th node is `blockquote`', () => { assert.equal(domNodes[7].type, 'blockquote'); });
    });
    
  });
  
});
