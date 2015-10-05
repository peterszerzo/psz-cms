import React from 'react';
import { Link } from 'react-router';

import Header from './../../general/header.jsx';

class About extends React.Component {

	render() {
		return (
			<div>
				<Header activeLinkName='about' isTransparent={true} />
				<div className='hero' style={{backgroundImage: 'url(/images/me/me_1200.jpg)'}}>
					<div className='hero__overlay' />
					<div className='hero__text'>Hi</div>

				</div>
			</div>
		);
	}

}

export default About;