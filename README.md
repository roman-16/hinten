🔐 Hinten is a small, scoped react state managment system using hooks and a simple api.

# Index
* [Features](#Features)
* [Installation](#Installation)
* [Usage](#Usage)
  * [Store creation](#Store\ creation)
  * [Store usage](#Store\ usage)
  * [Scoped store usage](#Scoped\ store\ usage)

# Features
* < 2kB gzip, gets checked thanks to [bundlesize](https://github.com/siddharthkp/bundlesize)
* Scoping of state and actions
* Simple small API
* Usable for big states
* Only select what you need
* Full typescript support

# Installation
```
npm install hinten
```
or
```
yarn add hinten
```

# Usage
## Store creation
```js
// useStore.js
import createStore, { action } from 'hinten';

const useStore = createStore({
  // State
  count: 1,

  // Actions which change the state
  increment: action((state) => ({ count: state.count + 1 })),
  // Actions can have a payload, which will be placed in the second argument
  setCount: action((state, count) => ({ count })),

  // Scope
  sideMenu: {
    isOpen: false,
    maxItems: 100,

    // This action has the same key as the action above
    // If the action above gets called, this gets too
    // If the action in this scope gets called, the above won't get called
    increment: action((state) => ({ maxItems: state.maxItems + 1 })),
    // This action is only available in this scope
    toggle: action((state) => ({ isOpen: !state.isOpen })),

    child: {
      isExpanded: false,

      toggle: action((state) => ({ isExpanded: !state.isExpanded })),
    },
  },
});

export default useStore;

```

## Store usage
```jsx
// A.jsx
import React from 'react';
import useStore from './useStore';

export default ({ ...props }) => {
  const { state, dispatch } = useStore();

  return (
    <div {...props}>
      <button
        type="button"
        onClick={() => {
          // The payload is the first argument
          dispatch.setCount(9);

          // increment in sideMenu will get called
          // it won't get called in the scope above
          dispatch.sideMenu.icrement();

          // toggle in sideMenu and in child will get called
          dispatch.sideMenu.toggle();
        }}
      >
        Test me!
      </button>

      {state.count}
      {state.sideMenu.isOpen}
    </div>
  );
}

```

## Scoped store usage
```jsx
// B.jsx
import React from 'react';
import useStore from './useStore';

export default ({ ...props }) => {
  // If you don't need the entire store you can simple select a part of it
  // This component will only get rerender if something changes in it's selected part
  const { state, dispatch } = useStore('sideMenu.child');

  return (
    <div {...props}>
      <button
        type="button"
        onClick={() => dispatch.toggle()}
      >
        Test me!
      </button>

      {state.isExpanded}
    </div>
  );
}

```
