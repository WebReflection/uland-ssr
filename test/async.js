const {Component, render, html} = require('../cjs/async.js');

const Item = Component(value => html`
  <li>${value}</li>
`);

const AsyncList = Component(async items => html`
  <ul>
    ${(await items).map(value => Item(value))}
  </ul>
`);

render({write: console.log}, AsyncList(Promise.all([1, 2, 3])));
