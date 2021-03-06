require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')


/**************** API Server ******************/
var articleArchiver = require("../src/api/article-archiver")
var kontentSettings = require("../src/api/kontent")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

/**************** Authentication ******************/
var passport = require('passport');
var Strategy = require('passport-local').Strategy
var authentication = require("../src/api/authentication")
var session = require('connect-ensure-login')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// passport.js
passport.use(new Strategy(
  function(username, password, cb) {
    authentication.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    authentication.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// authentication apis
app.post('/api/signin', 
  passport.authenticate('local', { failureRedirect: '/signin?state=failed',failureFlash: true }),
  function(req, res) {
    res.redirect('/?authenticate=true')
  });

app.get('/api/signout',
  function (req, res) {
    req.logout();
    res.redirect('/?signout=true')
  }
)

app.post('/api/signup', authentication.userSignUp())

app.get('/api/userstate',
  session.ensureLoggedIn('/signin'),
  function (req, res) {
    authentication.setUserAddr(req)
    res.send(JSON.stringify(req.user.username))
});

// kontent apis
app.use(bodyParser.json());
app.get('/api/config', kontentSettings.getConfiguration())
app.get('/api/article/:id', articleArchiver.getArticleById())
app.get('/api/article', articleArchiver.getAllArticle())
app.get('/api/article/:id/remove', session.ensureLoggedIn('/signin'), articleArchiver.removeArticleById())
app.post('/api/article', session.ensureLoggedIn('/signin'), articleArchiver.writeArticle())
app.post('/api/article/:id', session.ensureLoggedIn('/signin'), articleArchiver.editArticleById())
app.post('/api/config', session.ensureLoggedIn('/signin'), kontentSettings.writeConfiguration())

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
