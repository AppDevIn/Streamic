import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token) {
    cookie.set('token', token)

    //Regirect to another route
    Router.push('/index')
}