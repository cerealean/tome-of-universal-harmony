export function range(num: number) {
    return Array.from(Array(num).keys()).map(n => n + 1);
}
