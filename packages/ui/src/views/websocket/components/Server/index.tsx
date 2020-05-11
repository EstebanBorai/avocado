import React, { useState, useMemo, useCallback } from 'react'
import './server.scss'
import Control from 'components/Control'
import Input from 'components/Input'
import Button from 'components/Button'
import WebSocketContext, { IWebSocketContext } from '../../context/websocket'

const INITIAL_VALUE = 'ws://127.0.0.1:5200'

function Server (): JSX.Element {
  const { connect, isConnected } = React.useContext<IWebSocketContext>(WebSocketContext)
  const [value, setValue] = useState<string>(INITIAL_VALUE)

  const isConnectDisabled = useMemo(() => {
    return value === INITIAL_VALUE
  }, [value])

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    connect(value)
  }, [value])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value

    setValue(textValue)
  }, [value])

  return (
    <Control title='Server'>
      <span>{isConnected ? 'Connected' : 'Not Connnected'}</span>
      <form id='server' onSubmit={handleSubmit}>
        <Input
          id='input'
          type='text'
          value={value}
          label='URL'
          name='url'
          placeholder='wss://'
          onChange={handleChange}
        />
        <Button
          id='button'
          text='Connect'
          type='submit'
          intent='primary'
          disabled={isConnectDisabled}
        />
      </form>
    </Control>
  )
}

export default Server
