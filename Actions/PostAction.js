import { POSTS } from '../Constants'

export function fetchPostAction() {
  return {
    type: POSTS.REQUEST
  }
}