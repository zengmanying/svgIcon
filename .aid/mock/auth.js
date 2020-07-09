module.exports = [
  {
    url: '/mock/dologin',
    method: 'post',
    type: 'func',
    response: req => {
      if (req.body.username === 'admin' &&
        req.body.password === '11' &&
        req.body.verify.toLowerCase() === 'itzx') {
        return {
          success: true,
          auth: {
            username: 'admin',
            token: 't1294jiweniweu9gjha'
          }
        }
      } else {
        return {
          success: false
        }
      }
    }
  },
  {
    url: '/mock/dologout',
    method: 'post',
    type: 'func',
    response: req => {
      return {
        'success': true
      }
    }
  }
]