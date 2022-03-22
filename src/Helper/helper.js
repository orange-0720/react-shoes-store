export const formatPrice = cent => {
    return (cent / 100).toLocaleString('zh', {
        style: 'currency',
        currency: 'CNY',
    })
}