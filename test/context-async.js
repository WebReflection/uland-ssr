const {
  Component,
  createContext,
  html,
  render,
  useContext,
} = require("../cjs/async");

const FooContext = createContext();

const FooComponent = Component(() => {
  const value = useContext(FooContext);
  return html`<div>${value}</div>`;
});

async function doRender(fooValue) {
  FooContext.provide(fooValue);

  // Realistically, a delay would happen inside rendering of complex components.
  await new Promise((resolve) => setTimeout(resolve, 1));

  const renderedHtml = await render(
    String,
    () =>
      html`<!DOCTYPE html>
  <html>
    ${FooComponent()}
  </html>
  `,
  );

  console.log(renderedHtml);
}

doRender("123");
doRender("456");
