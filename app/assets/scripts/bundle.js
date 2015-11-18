require('./../styles/site.scss')

import { render } from 'react-dom'

import routes from './../../routes/client.jsx'
import Qajax from 'qajax'

global.Qajax = Qajax

global.startPSz = () => {
	// Developer signature
	console.log('Hi, Mom!')
	var appContainer = global.document.getElementById('site')
	render(routes, appContainer)
}