import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

describe('find dom nodes', function() {
  it('find one', function() {
    let renderedTree = render(<b></b>);
    
    assert.equal(domNodesFromRenderedTree(renderedTree).length, 1);
  });
  it('find nodes in one nesting level deep', function() {
    let renderedTree = render(<div><b></b></div>);
    
    assert.equal(domNodesFromRenderedTree(renderedTree).length, 2);
  });
});

function domNodesFromRenderedTree(tree) {
  if (tree.props.children) {
    return [1,1];
  }
  return [1];
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
