import { getPayload } from '../lib/auth'

export function checkFavorite(table) {
  return table.favoritedBy.some(user => user.id === getPayload().sub)
}