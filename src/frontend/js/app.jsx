const React = require('react')
const createReactClass = require('create-react-class')
const Flickr = require('./flickr');
const Collage = require('./collage');

module.exports = createReactClass({
  displayName: 'App',

  // getInitialState :: {error :: String}
  getInitialState() { return {error: ""} },

  // showError :: String -> State Error
  showError(s) { this.setState({error: s}); },

  render() {
    return (
      <div id="app">
        { this.state.error ? <p>{this.state.error}</p> : null }
        <Flickr showError={this.showError}/>
        <Collage showError={this.showError}/>
      </div>
    );
  }
});

