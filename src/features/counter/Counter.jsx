import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, multiplyByAmount, incrementByAmount, addAmountAsync } from './counterSlice'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const status = useSelector(state => state.counter.status)

  const dispatch = useDispatch()


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="multiply by 2"
          onClick={() => dispatch(multiplyByAmount(2))}
        >multiply by 2</button>
        <button
          aria-label="increment by 5"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          increment by 5
        </button>
        <button
          area-label="Add 10 Async"
          disabled={status !== 'done'}
          onClick={() => dispatch(addAmountAsync(10))}>Add 10 Async
        </button>
      </div>
    </div>
  )
}