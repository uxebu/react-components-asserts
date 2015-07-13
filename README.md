# react-components-asserts

Asserts for react.js components using the shallow renderer.

# Early stage

This is just a very early draft and evolves with the features needed where this project is used, 
initially for the es6katas.org site. Will see where it goes from here.

# What is it?

In order to do TDD with unit tests, without the need to interact with the DOM 
this package will provide some assert functions that help verifying certain 
conditions when building components.
It is NOT meant for HTML structure validation. The main intention is to verify that
certain properties and components are used and receive the correct data.
Using this may lead to better components design and allows for refactoring components.

Assert functions like `rendersDomNodeWithInnerText(component, innerText)` will ensure that some DOM node
inside a component has the expected `innerText` where in the HTML structure it is located is not
scope of this project.

# Example

```jsx
class Article extends React.Component {
  render() {
    return (
      <div id="someLayout">
        <div id="moreLayout-irrelevant-for-our-test">
          <a href="#some"></a>
        </div>
      </div>
    );
  }
}
class OtherComp extends React.Component {
  render() {
    return (
      <a className="#some"></a>
    );
  }
}
```

a test could now validate that the price gets rendered at all, as an innerText, like so:

```js
import {rendersDomNodeWithAttrAndValue} from 'react-components-asserts';

it('has an `href=#some`', function() {
  rendersDomNodeWithAttrAndValue(<Article />, 'href', '#some');
});

it('also has an `className=#some`', function() {
  rendersDomNodeWithAttrAndValue(<OtherComp />, 'className', '#some');
});
```
