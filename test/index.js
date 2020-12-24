const {Component, render, html, useState} = require('../cjs');

const Counter = Component((initialState) => {
  const [count, setCount] = useState(initialState);
  return html`
  <button onclick=${() => setCount(count + 1)}>
    Count: ${count}
  </button>`;
});

console.log(
  render(String, () => html`
    <div>
      A bounce of counters.<hr>
      ${Counter(0)} ${Counter(1)}
    </div>
  `)
);
