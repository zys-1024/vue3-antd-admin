module.exports = {
    fail: (msg = 'error', code = 400) => ({ data: null, code, msg }),
    success: (data = null, msg = 'success', code = 200) => ({ data, code, msg  })
}