import * as React from 'react'
import './main.scss'
import WSocket from '../../views/websocket'
import Header from '../Header'

function Main (): JSX.Element {
  return (
    <div id='app-main'>
      <Header />
      <main>
        <WSocket />
      </main>
    </div>
  )
}

export default Main
