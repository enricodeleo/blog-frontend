const replaceInFiles = require('replace-in-files');

const options = {
  // See more: https://www.npmjs.com/package/globby
  // Single file or glob
  files: 'dist',

  // See more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  // Replacement
  from: /enricodeleo.s3.eu-south-1.amazonaws.com/g,  // string or regex
  to: 'i2.wp.com/enricodeleo.s3.eu-south-1.amazonaws.com', // string or fn  (fn: carrying last argument - path to replaced file)


  //Character encoding for reading/writing files
  encoding: 'utf8',  // default
};

replaceInFiles(options)
  .then(({ changedFiles, countOfMatchesByPaths }) => {
    console.log('Modified files:', changedFiles);
    console.log('Count of matches by paths:', countOfMatchesByPaths);
    console.log('was called with:', options);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
