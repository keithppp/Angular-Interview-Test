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

module.exports = function(Router, Errors) {
  Router.get('/:directory/:partial?', function(req, res, next){
    var directory;
    var partial;

    var baseDir = 'templates/';

    if(req.params.partial == null){
      partial = req.params.directory;
      res.render(baseDir + partial, {}, function(err, html){
        if(err){
          req.errorStatus = 404;
          return next(new Errors.ResourceNotFoundError('Failed to build or lookup template'))
        }
        return res.end(html);
      })
    } else {
      directory = req.params.directory
      partial = req.params.partial
      res.render(baseDir + '/' + directory + '/' + partial, {}, function(err, html){
        if(err){
          req.errorStatus = 404;
          return next(new Errors.ResourceNotFoundError('Failed to build or lookup template'))
        }

        return res.end(html)
      })
    }
  }, Errors.handle());

  return Router
}