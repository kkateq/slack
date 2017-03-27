import http from 'request'

export default function exec(url, form, callback) {

  // stringify any objects under keys since form is posted as application/x-www-form-urlencoded
  Object.keys(form).forEach(function (key) {
    if (typeof form[key] === 'object') {
      form[key] = JSON.stringify(form[key])
    }
  })

  // always post
  http.post({
    url: `https://slack.com/api/${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form
  },
    function _res(err, res) {
      // var rateLimit = 'You are sending too many requests. Please relax.'
      if (err) {
        // if request failed bubble the error
        callback(err)
      }
      else if (res.body) {
        const data = JSON.parse(res.body)
        if (data.error) {
          callback(Error(data.error))
        }
        else {
          callback(null, data)
        }
      }
    })
}
