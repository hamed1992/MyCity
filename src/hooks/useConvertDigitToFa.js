
function useConvertDigitToFa(string) {
    return string.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
export { useConvertDigitToFa };
