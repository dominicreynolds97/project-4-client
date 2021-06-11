import axios from 'axios'
import { headers } from './headers'
const baseUrl = '/api'

export function getAllTracks() {
  return axios.get('/api/tracks/')
}

export function createTrack(formdata) {
  return axios.post(`${baseUrl}/tracks/`, formdata, headers)
}

export function getAllArtists() {
  return axios.get(`${baseUrl}/artists/`)
}

export function getSingleArtist(artistId) {
  return axios.get(`${baseUrl}/artists/${artistId}/`)
}

export function favorite(table, tableId) {
  return axios.post(`${baseUrl}/${table}/${tableId}/favorite/`, headers)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}