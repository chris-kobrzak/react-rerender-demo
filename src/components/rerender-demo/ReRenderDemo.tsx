import React, { useState, useRef } from 'react'

import OptimizedUserDisplay from './OptimizedUserDisplay'
import ProblematicUserDisplay from './ProblematicUserDisplay'

const ReRenderDemo: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(1)
  const [counter, setCounter] = useState(0)
  const renderCount = useRef(0)
  renderCount.current += 1

  console.log(`� ReRenderDemo rendered ${renderCount.current} times`)

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value))
  }

  const handleForceRerender = () => {
    setCounter((total) => total + 1)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Array.find Re-render Demonstration</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Controls</h2>
        <div>
          <label>
            Select User ID:
            <select value={selectedUserId} onChange={handleUserChange}>
              <option value={1}>1 - Alice</option>
              <option value={2}>2 - Bob</option>
              <option value={3}>3 - Charlie</option>
              <option value={4}>4 - Diana</option>
              <option value={5}>5 - Eve</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleForceRerender}>
            Force Re-render (Counter: {counter})
          </button>
          <p>
            <em>
              Click this button to force a re-render without changing the
              selected user. The problematic component will re-render
              unnecessarily.
            </em>
          </p>
        </div>
      </div>

      <div>
        <h2>Components</h2>
        <ProblematicUserDisplay userId={selectedUserId} />
        <OptimizedUserDisplay userId={selectedUserId} />
      </div>

      <div
        style={{
          marginTop: '20px',
          backgroundColor: '#f0f0f0',
          padding: '15px'
        }}
      >
        <h3>Instructions:</h3>
        <ol>
          <li>Open your browser developer console to see the render logs</li>
          <li>
            Click the Force Re-render button multiple times while keeping the
            same user selected
          </li>
          <li>
            Notice how the red (problematic) component re-renders every time
          </li>
          <li>
            Notice how the green (optimized) component only re-renders when the
            userId actually changes
          </li>
          <li>
            Change the user selection and see how both components handle the
            change
          </li>
        </ol>

        <h4>Why this happens:</h4>
        <p>
          <strong>Two optimization techniques working together:</strong>
        </p>
        <ol>
          <li>
            <strong>Hook optimization:</strong> The useArrayFind hook calls
            Array.find() on every render, which returns a new object reference
            each time (even if the data is identical). The useArrayFindOptimized
            hook uses useMemo to memoize the result, only recalculating when the
            userId dependency changes.
          </li>
          <li>
            <strong>Component optimization:</strong> The optimized component is
            wrapped in React.memo, which prevents re-renders when props haven't
            changed. The problematic component re-renders every time its parent
            re-renders.
          </li>
        </ol>

        <p>
          <em>
            Both optimizations are needed: useMemo prevents unnecessary
            calculations, and React.memo prevents unnecessary re-renders.
          </em>
        </p>
      </div>
    </div>
  )
}

export default ReRenderDemo
