export function handlerDuplicateError(error: any) {
    let actual = error as Error
    if (error.code === 11000 && error.name === "MongoError") {
        const property = Object.keys(error.keyValue)[0]
        actual.message = JSON.stringify({ property })
    }
    return actual
}
