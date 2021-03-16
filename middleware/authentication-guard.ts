import { Middleware } from '@nuxt/types'

const authenticationGuard: Middleware = (context) => {
    setTimeout(() => {
        const isAuthenticated = context.$fire.auth.currentUser != null

        if (!isAuthenticated) {
            context.redirect('/login')
        }
    }, 1000)
}

export default authenticationGuard