import DomNode from './domnode.js';
import ReactComponent from './reactcomponent.js';

export default class Renderer {
  static withComponent(component) {
    let renderer = new Renderer();
    renderer.component = component;
    return renderer;
  }
  
  allReactComponents() {
    return allReactComponents(this.component);
  }
}


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