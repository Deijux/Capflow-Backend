const handleError = (res, status, error) => {
  console.error('New error generated:')
  console.log(error)
  return res.status(status).send({ errors: error })
}

module.exports = { handleError }
