const formatCurrency = (value) => value.toLocaleString('id-ID', {
  style: 'currency',
  currency: 'IDR'
})

export default formatCurrency;
