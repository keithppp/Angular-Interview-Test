/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project AngularBasicSkills
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 *
 * @module index
 */
'use strict';
var _ = require('lodash');
var uuid = require('uuid');
var testData = populate(1000)

module.exports = function(Router, Errors){

  /**
   * @api {get} /api/users Get All Users
   * @apiName AllUsers
   * @apiGroup User
   *
   * @apiParam {Number} offset Number of rows to offset data from beginning of set.
   * @apiParam {Number} limit Number of rows to return.
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.count Number of included results
   * @apiSuccess {Object[]} data.rows Results
   */
  Router.get('/', function(req, res){
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || testData.length;
    var sliced = testData.slice(offset, offset + limit)
    res.json({count: testData.length, rows: sliced})
  });

  /**
   * @api {get} /api/users/:uuid Get individual user
   * @apiName IndividualUser
   * @apiGroup User
   *
   * @apiParam {String} uuid UUID of user to get.
   *
   * @apiSuccess {Object} data Found User.
   */
  Router.get('/:uuid', function(req, res, next){
    var user = _.find(testData, {uuid: req.params.uuid})
    if(user) return res.json(user)
    return next(new Errors.ResourceNotFoundError('Could not find a user with that uuid'))
  }, Errors.handle())

  /**
   * @api {post} /api/users Create a new user
   * @apiName CreateUser
   * @apiGroup User
   *
   * @apiParam {Object} body
   * @apiParam {String} body.name Name of new user.
   * @apiParam {Number} body.age Age of new user.
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Boolean} data.created
   * @apiSuccess {Object} data.user New User
   */
  Router.post('/', function(req, res, next){
    if(req.body && req.body.name && req.body.age){
      var newUser = {
        name: req.body.name,
        age: req.body.age,
        uuid: uuid.v4()
      }
      testData.push(newUser)
      return res.json({created: true, user: newUser})
    }
    return next(new Errors.ResourceRequiredError('Body values required to create a user.'))
  }, Errors.handle())

  /**
   * @api {put} /api/users/:uuid Update a User
   * @apiName UpdateUser
   * @apiGroup User
   *
   * @apiParam {String} uuid UUID of user to update.
   *
   * @apiParam {Object} body
   * @apiParam {Object} body.name New Name of existing user.
   * @apiParam {Object} body.age New Age of existing user.
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Boolean} data.updated
   * @apiSuccess {Object} data.user Updated User
   */
  Router.put('/:uuid', function(req, res, next){
    if(req.body && (req.body.name || req.body.age) ){
      var index = _.findIndex(testData, {uuid: req.params.uuid});
      if(index >= 0){
        var user = testData[index];
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        return res.json({updated: true, user: user})
      }
      return next(new Errors.ResourceNotFoundError('Could not find a user with that uuid'))
    }
    return next(new Errors.ResourceRequiredError('Body values required to create a user.'))
  }, Errors.handle())

  /**
   * @api {delete} /api/users/:uuid Delete a User
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiParam {String} uuid UUID of user to delete.
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Boolean} data.deleted
   */
  Router.delete('/:uuid', function(req, res, next){
    var previousLength = testData.length;
    var currentLength;
    _.remove(testData, function(user){
      return user.uuid === req.params.uuid
    })
    currentLength = testData.length
    if(currentLength === previousLength - 1){
      return res.json({deleted: true})
    }
    return next(new Error('Something broke.'))

  }, Errors.handle())

  return Router
}




function populate(number){
  var first = [
    'Akane','Barry','Chantal','Danielle','Earl','Fabian','Gabielle','Hanna',
    'Irene','Jeanne','Kaori','Larry','Marco','Nadine','Odette','Pablo','Rafael',
    'Sachiko','Tammy','Valerie','Walter','Youko'
  ];

  var last = [
    'Abbott','Bailey','Cabrera','Dale','Eaton','Farley','Gaines','Hahn',
    'Ingram','Jackson','Kane','Lamb','Macdonald','Nash','Obrien','Pace','Quinn','Ramirez',
    'Salas','Talley','Underwood','Valdez','Wade','Yang','Zamora'
  ];

  var mock = []
  while(number > 0){
    var u = {
      name: first[Math.floor(Math.random() * first.length)] + ' ' + last[Math.floor(Math.random() * last.length)],
      age: _.random(13, 75),
      uuid: uuid.v4()
    }
    number -= 1;
    mock.push(u)
  }

  return mock;
}