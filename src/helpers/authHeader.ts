export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user') as any);

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
