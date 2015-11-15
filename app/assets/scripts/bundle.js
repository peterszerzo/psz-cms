// import * as style from './../styles/site.scss'

import { render } from 'react-dom'

import routes from './../../routes/client.jsx'

global.psz = {

	start: () => {
		// Developer signature
		console.log('Hi, Mom!')
		var appContainer = global.document.getElementById('site')
		render(routes, appContainer)
	}

}