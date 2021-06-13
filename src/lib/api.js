import axios from 'axios'
const baseUrl = '/api'
import { getToken, getPayload } from './auth'

function headers() {
  return { 
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

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

export function getSingleRelease(releaseId) {
  return axios.get(`${baseUrl}/releases/${releaseId}/`)
}

export function getAllGigs() {
  return axios.get(`${baseUrl}/live-music/gigs/`)
}

export function favorite(table, tableId) {
  return axios.post(`${baseUrl}/${table}/${tableId}/favorite/`, headers())
}

export function loginUser(formdata) {
  const res = axios.post(`${baseUrl}/auth/login/`, formdata)
  console.log(formdata)
  return res
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function getSingleUser(userId) {
  return axios.get(`${baseUrl}/auth/users/${userId}/`)
} 