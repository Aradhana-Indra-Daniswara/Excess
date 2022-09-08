const formatter = new Intl.NumberFormat('id-ID', { // TODO: Intl NOT FOUND ON ANDROID
  style: 'currency',
  currency: 'IDR'
})

const formatCurrency = (value) => formatter.format(value)

export default formatCurrency;
