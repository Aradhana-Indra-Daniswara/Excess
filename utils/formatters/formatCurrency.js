const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

const formatCurrency = (value) => formatter.format(value)

export default formatCurrency;
