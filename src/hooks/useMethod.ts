import { reactive } from 'vue'

const methods = reactive<Record<string, Function | null>> ({})

const setMethod = (name: string, method: Function | null) => {
    methods[name] = method
}

const getMethod = (name: string): Function | null => {
    return methods[name]
}

export default () => ({
    setMethod,
    getMethod
})