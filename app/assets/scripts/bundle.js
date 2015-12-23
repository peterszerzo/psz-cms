import './../styles/site.scss'

import { render } from 'react-dom'

import router from './../../routes/client.jsx'

global.startPSz = () => {
	// Developer signature
	console.log('Hi, Mom!')
	var appContainer = global.document.getElementById('site')
	render(router.reactReduxRouter, appContainer)
}