export function isDirty(ref: React.MutableRefObject<HTMLElement | undefined>): boolean {
    return Boolean(ref.current?.classList.contains("touched"))
}
export function isInvalid(ref: React.MutableRefObject<HTMLElement | undefined>): boolean {
    return isDirty(ref) && Boolean(ref.current?.classList.contains("invalid"))
}

export function isValid(ref: React.MutableRefObject<HTMLElement | undefined>): boolean {
    return isDirty(ref) && !Boolean(ref.current?.classList.contains("invalid"))
}
