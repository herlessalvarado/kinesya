interface ValidatorResult {
    validator: (value: any) => boolean
    message: string
}

export const decimalValidatorResult: ValidatorResult = {
    validator: validateDecimal,
    message: "Debe ingresar un numero con un máximo de dos decimales",
}
export const textLengthValidatorResult: ValidatorResult = {
    validator: validateTextLength,
    message: "No debe superar los 20 caracteres",
}
export const textAreaLengthValidatorResult: ValidatorResult = {
    validator: validateTextAreaLength,
    message: "No debe superar los 250 caracteres",
}
export const ageValidatorResult: ValidatorResult = {
    validator: validateAge,
    message: "Debes tener al menos 18 años",
}
export const menuValidatorResult: ValidatorResult = {
    validator: validateTextLength,
    message: "Debes escoger una opcion",
}

export const servicesValidatorResult: ValidatorResult = {
    validator: validateServices,
    message: "Debes escoger al menos un servicio",
}
export const priceValidatorResult: ValidatorResult = {
    validator: validatePrice,
    message: "El precio minimo es de S/100",
}

export const phoneValidatorResult: ValidatorResult = {
    validator: validatePhone,
    message: "Debes colocar un numero valido",
}

export function validateAge(text: string) {
    return parseInt(text) >= 18
}

export function validatePrice(text: string) {
    if (text.length === 0) return true
    return parseFloat(text) >= 100.0
}

export function validatePhone(text: string) {
    if (text.length === 0) return true
    return /^\d{9}$/.test(text)
}

export function validateTextAreaLength(text: string) {
    return text.length < 250
}

export function validateTextLength(text: string) {
    return text.length < 20
}
export function validateDecimal(value: string) {
    if (value.length === 0) return true
    return /^\d+\.?\d{0,2}$/.test(value)
}

export function validateServices(value: any[]) {
    return value.length > 0
}
