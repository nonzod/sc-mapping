// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number
    login: string|null,
    role: string|null
  }
}

export {}