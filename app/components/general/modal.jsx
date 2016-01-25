import React from 'react'

export default function Modal(props) {

	return (
		<div className='modal'>
			<div className='modal__content'>
				{ props.children }
			</div>
		</div>
	)

}