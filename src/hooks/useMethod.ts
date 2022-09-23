import { reactive } from 'vue'

const methods = reactive<Record<string, Function>> ({})

const setMethod = (name: string, method: Function) => {
    methods[name] = method
}

const getMethod = (name: string): Function => {
    return methods[name]
}

export default () => ({
    setMethod,
    getMethod
})