import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export default class ReactComponent {
  
  static isReactComponent(maybeComponent) {
    if (typeof maybeComponent === 'undefined') {
      return false;
    }
    if (typeof maybeComponent.type !== 'function') {
      return false;
    }
    const prototype = Reflect.getPrototypeOf(maybeComponent.type);
    return prototype.name === 'ReactComponent';
  }
  
  static render(componentToRender) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(componentToRender);
    return shallowRenderer.getRenderOutput();
  }
}

