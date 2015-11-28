/*
 *
 *
 */
export default function geoEntitiesReducer(state = {}, action) {

	var { type, data } = action

	switch(type) {

		case 'FETCH_GLOBE_ANIMATION_GEO_JSON_SUCCESS':
			let globeAnimation = {
				status: 'success',
				data: data
			}
			return Object.assign({}, state, { globeAnimation: globeAnimation })

		default:
			return state

	}

}