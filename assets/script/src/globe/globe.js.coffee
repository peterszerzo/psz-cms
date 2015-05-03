@psz.globe = ->

	self = {}

	self.start = ->

		$el = $('.header__globe')

		width = $el.width()
		height = $el.height()

		svg = undefined

		# lambda - longitude
		lambda = d3.scale.linear()
			.domain([0, width])
			.range([-180, 180])

		# phi    - latitude
		phi = d3.scale.linear()
			.domain([0, height])
			.range([90, -90])

		eye =
			lambda0: 0
			phi0: 0
			updateByMouse: (context) ->
				p = d3.mouse context
				@lambda0 = - lambda(p[0])
				@phi0 = - phi(p[1])
			update: (dLambda, dPhi) ->
				@lambda0 += dLambda
				@phi0 += dPhi

		updateDimensions = ->
			width = $el.width()
			height = $el.height()
			svg.attr({ width: width, height: height })

		updateEye = ->
			eye.update 0.2, 0.2

		getPath = ->
			projection = d3.geo.orthographic().scale(width * 0.7).rotate([0, 0, 0]).translate([width/2, height/2 * 1.6])
			projection.rotate [ - eye.lambda0, - eye.phi0 ]
			path = d3.geo.path().projection(projection)
			path

		updateGeoPaths = ->
			path = getPath()
			svg.selectAll('path')
				.attr
					d: path
					opacity: getFeatureOpacity

		update = ->
			updateEye()
			updateGeoPaths()

		draw = (data) ->

			svg = d3.select('.header__globe').append('svg')

			updateDimensions()
			$(window).on 'resize', updateDimensions

			svg.selectAll('path').data(data.features)
				.enter()
				.append('path')
				.attr
					class: 'geopath'

			updateGeoPaths()

			setInterval update, 50

		

		$.get 'data/geo/countries.geo.json', draw

		subtractAngles = (angle1, angle2) ->
			if (angle1 < 90 && angle2 > 270) 
				return Math.abs(angle1 + 360 - angle2)
			if (angle2 < 90 && angle1 > 270) 
				return Math.abs(angle2 + 360 - angle1)
			Math.abs(angle1 - angle2)


		sphericalToCartesian = (lambda, phi, r = 1) ->
			degToRad = 1 / 57
			[ Math.cos(lambda * degToRad) * Math.cos(phi * degToRad) * r, Math.sin(lambda * degToRad) * Math.cos(phi * degToRad) * r, Math.sin(phi * degToRad) * r ]


		getDistance = (lambda1, phi1, lambda2, phi2) ->
			pos1 = sphericalToCartesian lambda1, phi1
			pos2 = sphericalToCartesian lambda2, phi2
			distance = ((pos2[0] - pos1[0]) ** 2 + (pos2[1] - pos1[1]) ** 2 + (pos2[2] - pos1[2]) ** 2) ** 0.5
			distance

		getFeatureOpacity = (feature) ->
			centroid = d3.geo.centroid feature
			lambda1 = centroid[0]
			phi1 = centroid[1]
			distance = getDistance eye.lambda0, eye.phi0, lambda1, phi1
			delta = distance / 2
			deltaMax = 0.3
			return 0 if (delta > deltaMax)
			return Math.pow((deltaMax - delta) / deltaMax, 1) * 0.4


	self.stop = ->
		$(window).off 'resize, updateDimensions'

	self
