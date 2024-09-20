// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number
    login: string,
    role: string
  }
}

export {}