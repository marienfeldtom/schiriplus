import { writable } from 'svelte/store'

export const user = writable(false)

export const User = function (user) {
const { subscribe, set } = writable('init');
  return {
    subscribe,
    signout: () => { set(null) },
		signin:  () => { set(user) }
	}
}()

export const profile = writable(false)

export const loading = writable(false)

export const role = writable({isAdmin: false})