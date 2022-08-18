const internalServerError = (res, err) =>
  res.json({ error: true, success: false, message: err.message })

module.exports = {
  internalServerError,
}
