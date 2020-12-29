const {Component, render, html} = require('../cjs/async.js');

const AsyncItem = Component(async value => {
  return html`
    <li>${await Promise.resolve(value)}</li>
  `;
});

const AsyncList = Component(async items => {
  return html`
    <ul>
      ${await Promise.all(items.map(value => AsyncItem(value)))}
    </ul>
  `;
});

(async () => {
  const items = [1, 2, 3];
  console.log(await render(String, AsyncList(items)));
})();
