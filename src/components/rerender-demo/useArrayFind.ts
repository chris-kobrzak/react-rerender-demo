import { useMemo } from 'react'

// Dummy array of users
const USERS = [
  { id: 1, name: 'Alice', role: 'admin', active: true },
  { id: 2, name: 'Bob', role: 'user', active: false },
  { id: 3, name: 'Charlie', role: 'moderator', active: true },
  { id: 4, name: 'Diana', role: 'user', active: true },
  { id: 5, name: 'Eve', role: 'admin', active: false }
]

export const useArrayFind = (userId: number) => {
  console.log('🔄 useArrayFind hook called with userId:', userId)

  // This is the problematic approach - Array.find creates a new object reference on every call
  // Even if the found user is the same, the reference will be different each time
  const foundUser = USERS.find((user) => user.id === userId)

  console.log('🔍 Array.find result:', foundUser)

  return foundUser
}

// Alternative optimized version using useMemo
export const useArrayFindOptimized = (userId: number) => {
  console.log('🚀 useArrayFindOptimized hook called with userId:', userId)

  // Using useMemo to memoize the result and avoid unnecessary re-renders
  const foundUser = useMemo(() => {
    console.log('💡 useMemo calculation running for userId:', userId)
    return USERS.find((user) => user.id === userId)
  }, [userId])

  console.log('✅ Memoized result:', foundUser)

  return foundUser
}
