export const HOME_ROUTE = '/'
// Links require both the route with route parameters and the route itself Ex: /club/penn-labs and /club/[club]
export const CLUB_ROUTE = (slug?: string): string =>
  slug ? `/club/${slug}` : '/club/[club]'
export const CLUB_EDIT_ROUTE = (slug?: string): string =>
  slug ? `/club/${slug}/edit` : '/club/[club]/edit'
export const CLUB_FLYER_ROUTE = (slug?: string): string =>
  slug ? `/club/${slug}/flyer` : '/club/[club]/flyer'
export const SETTINGS_ROUTE = '/settings'