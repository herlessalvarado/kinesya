export default function validateDecimal(value: string) {
    return /^\d+\.?\d{0,2}$/.test(value)
}
