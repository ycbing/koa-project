import glob from 'glob'

export default function (dirname) {
  return new Promise((resolve, reject) => {
    const routes = [];
    glob(`${dirname}/*`, {
      ignore: "**/app.js"
    }, (err, files) => {
      if (err) {
        return reject(err);
      }
      files.forEach(file => {
        const route = require(file); // esline-disable-line global-require, import/no-dynamic-require
        routes.push(route);
      });
      return resolve(routes)
    })
  })
}