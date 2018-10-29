const Task = require('data.task');
const { curry } = require('ramda')
const { Nothing, Just } = require('data.maybe')
const { getJSON, post } = require('jquery');

const Http = {
  // get :: Url -> Task Error JSON
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res)),
  post: curry((url, params) => new Task((rej, res) => post(url, JSON.stringify(params)).error(rej).done(res)))
}

const preventDefault = (e) => e.preventDefault()

// indexOf :: a -> [a] -> Maybe Number
const indexOf = curry((x, xs) => {
  const idx = xs.indexOf(x)
  return idx < 0 ? Nothing() : Just(idx)
})

module.exports = { Http, preventDefault, indexOf }
