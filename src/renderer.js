import DomNode from './domnode.js';
import ReactComponent from './reactcomponent.js';

export default class Renderer {
  
  constructor() {
    this._rendered = false;
  }
  
  static withComponent(component) {
    let renderer = new Renderer();
    renderer.component = component;
    return renderer;
  }
  
  allReactComponents() {
    this.render();
    return this._allReactComponents;
  }
  
  renderedTree() {
    this.render();
    return this._renderedTree;
  }
  
  render() {
    if (this._rendered) {
      return;
    }
    
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
    this._renderedTree = renderRecursively(this.component);
    this._allReactComponents = allReactComponents;
    this._rendered = true;
  }
}
