// import * as style from './../styles/site.scss'

import { render } from 'react-dom'

import routes from './../../routes/client.jsx'
import Qajax from 'qajax'

import Post from './../../models/post.js'



var post = Post.create()
post.setDefaults()
console.log(post)
console.log(post.getSqlInsertCommand())

global.Qajax = Qajax

global.psz = {

	start: () => {
		// Developer signature
		console.log('Hi, Mom!')
		var appContainer = global.document.getElementById('site')
		render(routes, appContainer)
	}

} 