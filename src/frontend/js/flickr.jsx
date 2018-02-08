const React = require('react')
const createReactClass = require('create-react-class')
const { flickerSearch } = require('./model')

module.exports = createReactClass({
  displayName: 'Flickr',

  // getInitialState :: {term :: String, results :: [Url]}
  getInitialState() { return {term: "", results: []} },

  // termChanged :: Event -> State Results
  termChanged({ currentTarget: t}) { this.setState({term: t.value })},

  updateResults(xs) { this.setState({ results: xs }) },

  searchClicked(_) { flickerSearch(this.state.term).fork(this.props.showError, this.updateResults) },
  render() {
    const imgs = this.state.results.map(src => <img src={src} key={src} />)
    return (
      <div id="flickr">
        <input onChange={this.termChanged}/>
        <button onClick={this.searchClicked}>Search</button>
        <div id="results">{imgs}</div>
      </div>
    );
  }
});

