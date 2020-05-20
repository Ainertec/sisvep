export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dfhqefbwifgywqbcvhbqwcwqe',
        user: {
          name: 'Cleiton',
          email: 'cleitonBaloneker@gmail.com',
        },
      })
    }, 2000)
  })
}
