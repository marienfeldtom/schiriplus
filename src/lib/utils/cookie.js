export function getSessionCookie(cookies) {
    console.log(cookies)
	const session = cookies.cookies.get('session');
	if (!session) return undefined;
	return JSON.parse(session);
}