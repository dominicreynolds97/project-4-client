
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectUri = 'http://127.0.0.1:3000/'
const TOKEN = 'https://accounts.spotify.com/api/token'

const scope = [
  'user-read-private', 
  'user-read-email',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-follow-read',
  'user-read-playback-position',
  'user-library-read',
  'streaming'
]

export function connectToSpotify() {
  localStorage.setItem('clientId', clientId)
  localStorage.setItem('clientSecret', clientSecret)
  const url = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&show_dialog=true&scope=${scope.join('%20')}`
  window.location.href = url
}

export const handleRedirect = () => {
  const code = getCode()
  fetchAccessToken(code)
}

const getCode = () => {
  const queryString = window.location.search
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('code')
  }
}

const fetchAccessToken = (code) => {
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
  callAuthorizationApi(body)
}

const callAuthorizationApi = (body) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', TOKEN, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret))
  xhr.send(body)
  xhr.onload = handleAuthorizationResponse
}
const handleAuthorizationResponse = () => {
  if (this.status == 200) {
    c
  }
}