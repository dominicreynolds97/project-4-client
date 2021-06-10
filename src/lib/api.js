import axios from 'axios'
import { getToken } from './auth'
import { headers } from './headers'
const baseUrl = '/api'

export function getAllTracks() {
  return axios.get('/api/tracks')
}

export function createTrack(formdata) {
  return axios.post(`${baseUrl}/tracks/`, formdata, headers)
}

export function getAllArtists() {
  return axios.get(`${baseUrl}/artists`)
}

export function getSingleArtist(artistId) {
  return axios.get(`${baseUrl}/artists/${artistId}`)
}