export const getAssets = (name: string): string => {
    return new URL(`../assets/${name}`, import.meta.url).href
}

export const removeLoading = () => {
    const loadingDom = document.getElementById('loading')
	loadingDom && document.body.removeChild(loadingDom!)
}