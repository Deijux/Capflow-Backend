const errorFormatter = ({ msg, path }) => {
  return { message: msg, field: path }
}

module.exports = errorFormatter
