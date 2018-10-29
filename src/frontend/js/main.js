const React = require('react');
const Dom = require('react-dom');
const App = require('./app');
const { ajaxSetup } = require('jquery');

ajaxSetup({ headers: 'application/json'})

Dom.render(<App />, document.getElementById('main'))
