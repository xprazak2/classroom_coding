const React = require('react')
const createReactClass = require('create-react-class')

module.exports = createReactClass({
  displayName: 'DragImage',

  // onDragStart :: Event -> State Event
  onDragStart({dataTransfer: dt, currentTarget: t}) { dt.setData('text', t.src) },

  render() {
    return <img {...this.props} src={this.props.src} key={this.props.src} draggable={true} onDragStart={this.onDragStart} />
  }
})