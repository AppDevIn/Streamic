import cookie from 'js-cookie'
import Router from 'next/router'

export function handleRegister(token) {
    cookie.set('token', token)

    //Regirect to another route
    Router.push('/index')
}


export function handleLogin(token) {
    cookie.set('token', token)

    //Regirect to another route
    Router.push('/index')
}


export function removeCookie(token) {
    cookie.remove(token)

    //Regirect to another route
    Router.push('/index')
}



export function redirectUser(ctx, location) {
    console.log("Redirecting");
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end()
    } else {
        Router.push(location)
    }
}