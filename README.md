# babel-plugin-env-imports (highly unstable)

A babel plugin for environment specific file imports. Kind of like [React Native's platform specific imports](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions).

## Install

```
npm install babel-plugin-env-imports
```

## Setup

Add the following line to your babel configuration:

```js
module.exports = {
  "plugins": [[
    "babel-plugin-env-imports",
    {
      "env": process.env.YOUR_ENV
    }
  ]]
}
```

## Example

[See here](https://github.com/jxom/babel-plugin-env-imports/tree/master/example)
