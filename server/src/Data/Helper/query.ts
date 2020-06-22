export interface Criteria {
    where: Array<Where>
    paginator?: Paginator
}

export interface Paginator {
    page: number
    limit: number
}

export interface Where {
    property: string
    eq?: string
    range?: { lower: number; upper: number }
    in?: string[]
}
