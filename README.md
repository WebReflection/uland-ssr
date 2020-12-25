# 🦄 <em>µ</em>land-ssr

![tiny island](https://raw.githubusercontent.com/WebReflection/uland/master/uland-head.jpg)

<sup>**Social Media Photo by [Ben Klea](https://unsplash.com/@benkleaphoto) on [Unsplash](https://unsplash.com/)**</sup>

*micro* land SSR, is [µland](https://github.com/WebReflection/uland#readme) API for SSR / DOM-less environments.

It allows using same components code on the client and the server, producing *html* or *svg* streams.


### 📣 Community Announcement

Please ask questions in the [dedicated forum](https://webreflection.boards.net/) to help the community around this project grow ♥

---

## API

```js
import {Component, render, html, useState} from 'uland-ssr';

const Counter = Component((initialState) => {
  const [count, setCount] = useState(initialState);
  return html`
  <button onclick=${() => setCount(count + 1)}>
    Count: ${count}
  </button>`;
});

// basic example, creates the expected output
// minus online events (would need re-hydration)
render(String, () => html`
  <div>
    A bounce of counters.<hr>
    ${Counter(0)} ${Counter(1)}
  </div>
`);
```
