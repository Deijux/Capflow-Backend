const orderProducts = products => {
  return products.reduce((acc, product) => {
    const { brand } = product
    if (!acc[brand]) {
      acc[brand] = []
    }
    acc[brand].push(product)
    return acc
  }, {})
}

module.exports = {
  orderProducts,
}
