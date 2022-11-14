export function extractBearerToken(header: string): string {
    if (header.startsWith('Bearer ')){
        return header.substring(7, header.length)
    } else {
        return ''
    }
}
