import useApi from "./hooks/useApi";
import { generateStory, getRegister } from './authApi';
import React, { useRef} from 'react'

export default function Login(email, password) {
  
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const register = useApi(() => getRegister(emailRef.current.value, passwordRef.current.value, 'klasdf;lka870234JHTakadsnv%$$986'))
  const story = useApi(() => generateStory(register.data.token, "Tell me a story about calvin and his stuffed tiger hobbes"))
  
  console.log("Story: ", story)
  
  return (
    <>
        <div >
          <div >
            <label htmlFor="email">Email</label>
          </div>
          <div >
            <input
              id="email"
              type="email"
              ref={emailRef}
              required
              placeholder='Email'
            />
          </div>
        </div>
        <div >
          <div >
            <label htmlFor='password'>Password</label>
          </div>
          <div >
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
              placeholder='Password'
            />
          </div>
        </div>
        <button
          type="button"
          onClick={register.exec}
        >
          Register
        </button>
      {register.isIdle ? <p>register Idle State</p>: null}
      {register.isPending ? <p>register Loading data</p> : null}
      {register.isError ? <p>register there was a problem</p> : null}
      {register.isSuccess ? <p> Successfully registered</p> : null}
    
      <button
          type="button"
          onClick={story.exec}
        >
          Generate Story
      </button>

    </>
  )
}
