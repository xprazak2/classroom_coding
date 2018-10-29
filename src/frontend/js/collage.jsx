const React = require('react')
const createReactClass = require('create-react-class')
const { append } = require("ramda")
const { Photo, replacePhoto } = require('./model')
const DragImage = require('./drag_image')
const { preventDefault, Http } = require('./utils')

module.exports = createReactClass({
  displayName: 'Collage',

  // getInitialState :: {photos :: [Photos]}
  getInitialState() { return {photos: []} },

  // updatePhotos :: [Url] -> State Photos
  updatePhotos(xs) { this.setState({ photos: xs }) },

  // onDrop :: Event -> State Photos
  onDrop({dataTransfer: dt, clientX: x, clientY: y, currentTarget: t}) {
    const offset = t.getBoundingClientRect().top
    const src = dt.getData('text')
    const photo = Photo(src, x, y - offset)
    this.updatePhotos(replacePhoto(photo, this.state.photos))
  },

  // saveClicked :: Event -> State Photo
  saveClicked(){ Http.post('/save', this.state.photos).fork(this.props.showError, this.updatePhotos) },

  render() {
    const imgs = this.state.photos.map(p => <DragImage src={p.src} key={p.src} style={{top: p.y, left: p.x}}/>)
    return (
      <div>
        <button onClick={this.saveClicked}>Save</button>
        <div id="collage" onDrop={this.onDrop} onDragOver={preventDefault}>
          <div id="photos">{imgs}</div>
        </div>
      </div>
    );
  }
});

