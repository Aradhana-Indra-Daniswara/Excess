const formatCurrency = (value) => {
  return `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}


export default formatCurrency;