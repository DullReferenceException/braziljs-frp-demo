require('babel/register');
require('../src/admin/server')
  .start()
  .then(function () {
    console.log('Started admin server at http://localhost:8081/');
  })
  .catch(function(err) {
    console.error(err.stack);
  });
