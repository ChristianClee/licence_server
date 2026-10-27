
export function filter_deleted_date_time<T extends {deleted_date_time: Date | null}>(arr: T[]): T[]{
    return arr.filter(i => !i.deleted_date_time)
}