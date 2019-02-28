# @doubledutch/react-timer

A DOM-agnostic `h:mm:ss` timer component that can be used for React or React Native.

It will count up from, or down to, `targetTime`

## React

The App component below will render HTML something like:
```html
<span class="my-timer">1:26:57</span>
```

```jsx
import React from 'react'
import SharedTimer from '@doubledutch/react-timer'

// Create DOM-specific component once in your project
const Timer = props => (
  <SharedTimer
    {...props}
    Wrapper="span"
    wrapperProps={{className: props.className}}
  />
)

// Reuse anywhere
const getTime = () => new Date()
const targetTime = new Date('2020-01-01:00:00:00')
const App = () => (
  <Timer getTime={getTime} targetTime={targetTime} className="my-timer" />
)
```

## React Native

The App component below will render a tree something like:

```jsx
<Text style={...}>1:26:57</Text>
```

```jsx
import React from 'react'
import { Text } from 'react-native'
import SharedTimer from '@doubledutch/react-timer'

// Create React-Native-specific component once in your project
const Timer = props => (
  <SharedTimer
    {...props}
    Wrapper={Text}
    wrapperProps={{style: props.style}}
  />
)

// Reuse anywhere
const getTime = () => new Date()
const targetTime = new Date('2020-01-01:00:00:00')
const App = () => (
  <Timer getTime={getTime} targetTime={targetTime} style={myStyle} />
)
```