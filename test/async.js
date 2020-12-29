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

render({write: console.log}, AsyncList([1, 2, 3]));
