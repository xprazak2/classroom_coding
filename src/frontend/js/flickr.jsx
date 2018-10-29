const React = require('react')
const createReactClass = require('create-react-class')
const { flickerSearch } = require('./model')
const DragImage = require('./drag_image')

module.exports = createReactClass({
  displayName: 'Flickr',

  // getInitialState :: {term :: String, results :: [Photo]}
  getInitialState() { return {term: "", results: []} },

  // termChanged :: Event -> State Results
  termChanged({ currentTarget: t}) { this.setState({term: t.value })},

  updateResults(xs) { this.setState({ results: xs }) },

  searchClicked(_) { flickerSearch(this.state.term).fork(this.props.showError, this.updateResults) },

  onDragStart({dataTransfer: dt, currentTarget: t}) { dt.setData('text', t.src) },

  render() {
    const imgs = this.state.results.map(p => <DragImage src={p.src} />)
    return (
      <div id="flickr">
        <input onChange={this.termChanged}/>
        <button onClick={this.searchClicked}>Search</button>
        <div id="results">{imgs}</div>
      </div>
    );
  }
});

