var nib     = require('nib');
var stylus  = require('stylus');

module.exports = function(app) {
  app.styleExtensions.push('.styl');
  app.compilers['.styl'] = stylusCompiler;
};

function stylusCompiler(file, filename, options) {
  options || (options = {});
  options._imports || (options._imports = []);
  var out = {};
  var s = stylus(file, options)
    .use(nib())
    .set('filename', filename)
    .set('compress', options.compress)
    .set('include css', true);
    
  if (options.use){
    s.use(options.use);
  }
  
  s.render(function(err, value) {
    if (err) throw err;
    out.css = value;
  });
  out.files = options._imports.map(function(item) {
    return item.path;
  });
  out.files.push(filename);
  return out;
}
