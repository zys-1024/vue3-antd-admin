export const getAssets = (name: string): string => {
    return new URL(`../assets/${name}`, import.meta.url).href
}