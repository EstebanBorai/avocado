import * as React from 'react'
import './main.scss'
import Server from '../Server'
import Request from '../Request'
import Log from '../Log'
import WebSocketService from '../../service/websocket.service'

const Main = (): JSX.Element => (
  <section id='websocket'>
    <Server />
    <Request />
    <Log />
  </section>
)

export default Main
