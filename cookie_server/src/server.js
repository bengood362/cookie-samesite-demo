const express = require('express')
const fs = require('fs')
const expressApp = express()
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})
const backHref = '<a href="javascript:window.history.back();">back</a>'
const cachedPage = fs.readFileSync('./public/index.html').toString()

expressApp.get('/', (req, res) => {
    const pageInStr = cachedPage.replace('%%REQUEST_COOKIE_PLACEHOLDER%%', req.headers.cookie)

    res.send(pageInStr).end()
})

// Attach cookie
expressApp.get('/strict', (req, res) => {
    res.cookie('cookieSameSite', 'strict', {
        sameSite: 'strict',
        secure: false,
    })
    res.send(`Done strict ${backHref}`).end()
})
expressApp.get('/lax', (req, res) => {
    res.cookie('cookieSameSite', 'lax', {
        sameSite: 'lax',
        secure: false,
    })
    res.send(`Done lax ${backHref}`).end()
})
// NOTE: browser might reject SameSite=none && secure=false. Update browser flags or attach a self-generated certificate if so
expressApp.get('/none', (req, res) => {
    res.cookie('cookieSameSite', 'none', {
        sameSite: 'none',
        secure: false,
    })
    res.send(`Done none ${backHref}`).end()
})
expressApp.get('/remove', (req, res) => {
    res.clearCookie('cookieSameSite')

    res.send(`Done remove ${backHref}`).end()
})

// Test Cookie
expressApp.get('/test', (req, res) => {
    res.send(`GET: your cookie is: ${req.headers.cookie}`).end()
})

expressApp.post('/test', (req, res) => {
    res.send(`POST: your cookie is: ${req.headers.cookie}`).end()
})

expressApp.get('/css', (req, res) => {
    res.sendFile('./public/external.css', { root: '.' })
})
expressApp.get('/img', (req, res) => {
    res.sendFile('./public/hedgehog.png', { root: '.' })
})

expressApp.listen(8080, 'cookie.localhost.com', () => {
    console.log('express cookie server started on 8080')
})
