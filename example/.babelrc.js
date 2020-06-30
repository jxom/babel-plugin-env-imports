module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [["../index.js", {
    "env": process.env.REGION,
    "extensionMap": {
      "EUROPE": 'eu',
      "OCEANIA": 'oc',
      "NORTH_AMERICA": 'na'
    }
  }]]
}
