'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post( '/login', 'LoginController.login' ).validator( 'Login' )

Route.group(() => {
  Route
   .resource('users', 'UserController')
   .apiOnly()
   .except(['store'])
   .validator( new Map([
     [['users.index', 'users.show', 'users.delete'], ['BaseValidator']],
     [['users.update'], ['User/Update']],
   ]))

  Route
   .resource('articles', 'ArticleController')
   .apiOnly()
   .validator( new Map([
     [['articles.index', 'articles.show', 'articles.delete'], ['BaseValidator']],
     [['articles.store'], ['Article/Store']],
     [['articles.update'], ['Article/Update']],
   ]))

   Route.post( '/logout', 'LoginController.logout' )

}).middleware( 'auth' )
