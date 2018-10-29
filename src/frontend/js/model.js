const { compose, map, prop, curry, remove, append, replace  } = require('ramda');
// const { mconcat } = require('pointfree-fantasy');
const Point = Number

const { fold } = require('pointfree-fantasy')

const daggy = require('daggy')

const { indexOf, Http } = require('./utils')
const { Some, None } = require('fantasy-options')

// mayToOpt :: Maybe a -> Option a
const mayToOpt = (m) => m.cata({ Just: Some, Nothing: () => None })

// Photo { src :: Url, x :: Point, y :: Point }
const Photo = daggy.tagged('src', 'x', 'y');

// newPhoto :: Url -> Photo
const newPhoto = (url) => Photo(url, 0, 0)

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

const Url = String

// makeUrl :: String -> Url
const makeUrl = (t) => baseUrl.replace("{TAGS}", t, baseUrl)

// toPhoto :: JSON -> [Photo]
const toPhoto = compose(map(compose(newPhoto, prop('url_s'))), prop('photo'), prop("photos"))

// flickerSearch :: String -> Task Error [Photo]
const flickerSearch = compose(map(toPhoto), Http.get, makeUrl )

// Photo -> [Photo] -> Maybe Number
const indexOfPhoto = curry((p, ps) => indexOf(p.src, ps.map(prop("src"))))

// replacePhoto :: Photo -> [Photo] -> [Photo]
const replacePhoto = curry((p, ps) => compose(fold(append(p), () => append(p, ps)),
                                              mayToOpt,
                                              map(i => remove(i, 1, ps)),
                                              indexOfPhoto(p))(ps))

module.exports = { flickerSearch, Photo, replacePhoto }