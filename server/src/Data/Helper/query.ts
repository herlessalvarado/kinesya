import { UserSchema } from "../Schema/UserSchema"

type Comparator = string
type schemaKeys = keyof UserSchema

export function equals(property: schemaKeys, value: UserSchema[typeof property]) {
    return `this.${property} === '${value}'`
}

export function between(property: schemaKeys, lower: number, upper: number) {
    return `this.${property} > '${lower}' && this.${property} < '${upper}'`
}

export interface Query {
    where: Array<Comparator>
    paginator?: Paginator
}

export interface Paginator {
    page: number
    limit: number
}
