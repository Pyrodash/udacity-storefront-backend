export function readBoolean(key: string, def = false): boolean {
    const val = (process.env[key] || '').toLowerCase()

    if (!val) {
        return def
    } else if (val === 'no' || val === 'false') {
        return false
    } else {
        return true
    }
}

export function readString(key: string, def = ''): string {
    return process.env[key] || def
}

export function readNumber(key: string, def = 0): number {
    return Number(process.env[key]) || def
}
