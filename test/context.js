const {
  Component,
  createContext,
  html,
  render,
  useContext,
} = require("../cjs");

const FooContext = createContext();

const Inner = Component(() => {
  const value = useContext(FooContext);
  return html`<div>${value}</div>`;
});

const Outer = Component(({ fooValue, children }) => {
  FooContext.provide(fooValue);
  return html`<div>${children}</div>`;
});

const renderedHtml = render(
  String,
  () =>
    html`<!DOCTYPE html>
<html>
  ${Outer({ fooValue: "123", children: Inner() })}
</html>
`,
);

console.log(renderedHtml);
