import React, { useRef } from 'react'

import { useArrayFind } from './useArrayFind'

type User = {
  id: number
  name: string
  role: string
  active: boolean
}

type ProblematicUserDisplayProps = {
  userId: number
}

const ProblematicUserDisplay: React.FC<ProblematicUserDisplayProps> = ({
  userId
}) => {
  const renderCount = useRef(0)
  renderCount.current += 1

  const user = useArrayFind(userId) as User | undefined

  console.log(`🔴 ProblematicUserDisplay rendered ${renderCount.current} times`)

  const renderCountText = `Problematic Component (Render count: ${renderCount.current})`
  const userText = user
    ? `User: ${user.name} (${user.role}) - ${
        user.active ? 'Active' : 'Inactive'
      }`
    : 'User not found'

  return (
    <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
      <h3>{renderCountText}</h3>
      <p>{userText}</p>
    </div>
  )
}

export default ProblematicUserDisplay
