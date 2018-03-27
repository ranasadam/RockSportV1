import { PODCASTS } from '../Constants'

export function fetchPodcastAction() {
  return {
    type: PODCASTS.REQUEST
  }
}