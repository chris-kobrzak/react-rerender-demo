import React, { useRef } from 'react'

import { useArrayFindOptimized } from './useArrayFind'

type User = {
  id: number
  name: string
  role: string
  active: boolean
}

type OptimizedUserDisplayProps = {
  userId: number
}

const OptimizedUserDisplay: React.FC<OptimizedUserDisplayProps> = React.memo(
  ({ userId }) => {
    const renderCount = useRef(0)
    renderCount.current += 1

    const user = useArrayFindOptimized(userId) as User | undefined

    console.log(`🟢 OptimizedUserDisplay rendered ${renderCount.current} times`)

    const renderCountText = `Optimized Component (Render count: ${renderCount.current})`
    const userText = user
      ? `User: ${user.name} (${user.role}) - ${
          user.active ? 'Active' : 'Inactive'
        }`
      : 'User not found'

    return (
      <div
        style={{ border: '2px solid green', padding: '10px', margin: '10px' }}
      >
        <h3>{renderCountText}</h3>
        <p>{userText}</p>
      </div>
    )
  }
)

OptimizedUserDisplay.displayName = 'OptimizedUserDisplay'

export default OptimizedUserDisplay
