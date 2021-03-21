import { Middleware } from '@nuxt/types'

const authenticationGuard: Middleware = (context) => {
    context.$fire.auth.onAuthStateChanged((user) => {
        if (!user) {
            context.redirect('/login')
        }
    })
}

export default authenticationGuard