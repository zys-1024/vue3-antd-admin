module.exports = {
    fail: (msg, code = 400) => ({ data: null, code, msg }),
    success: (data = null, msg = '', code = 200) => ({ data, code, msg  })
}