/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project AngularBasicSkills
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Default route
 * @module index
 */
'use strict';
module.exports = function(Router){

  Router.get('/', function(req, res, next){
    return res.render('FrontPage')
  })

  return Router
}