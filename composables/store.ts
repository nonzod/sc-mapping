import { useUserSession } from '#imports'

export const useGlobalStore = () => useState<any>('gs', () => {
  const { loggedIn, user, session } = useUserSession()

  return {
    loggedIn: loggedIn,
    session: session,
    user: user
  }
})