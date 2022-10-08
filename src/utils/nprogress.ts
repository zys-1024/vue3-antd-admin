import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: 'ease',
    speed: 1000,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
    parent: 'body'
})

const nprogress =  {
    start: () => NProgress.start(),
    done: () => NProgress.done()
}

export default nprogress