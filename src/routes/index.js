const fs = require('fs')

export default function (app) {
  const files = fs.readdirSync(__dirname)

  // eslint-disable-next-line no-restricted-syntax
  for(const file of files) {
    // eslint-disable-next-line no-continue
    if(!file.endsWith('.router.js')) continue
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const router = require(`./${file}`)
    app.use(router.routes()).use(router.allowedMethods({ throw: true}))
  }
}

