var React = require('react');

var Logos = {};

Logos.Neutral = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<circle cx="200" cy="200.712" r="199.221"/>
				</g>
			</svg>
		);
	}

}

Logos.Atlas = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<path d="M199.135,399.16C89.263,398.686,0.582,309.228,1.059,199.354C1.536,89.482,90.992,0.801,200.865,1.279
						c109.872,0.478,198.554,89.934,198.076,199.806C398.463,310.957,309.008,399.639,199.135,399.16z"/>
				</g>
				<g>
					<rect x="124.062" y="233.479" fill="#FFFFFF" width="152.028" height="21.306"/>
					<rect x="124.062" y="189.956" fill="#FFFFFF" width="152.028" height="21.762"/>
					<rect x="161.499" y="146.433" fill="#FFFFFF" width="114.592" height="21.762"/>
					<path fill="#FFFFFF" d="M123.91,157.39c0-6.696,5.479-12.175,12.175-12.175c6.696,0,12.174,5.479,12.174,12.175
						s-5.479,12.175-12.174,12.175C129.388,169.564,123.91,164.086,123.91,157.39"/>
				</g>
			</svg>
		);
	}

}

Logos.About = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<circle cx="200" cy="200" r="199.221"/>
				</g>
				<g>
					<circle fill="#FFFFFF" cx="140" cy="273.987" r="14.999"/>
					<circle fill="#FFFFFF" cx="200" cy="282.987" r="14.999"/>
					<circle fill="#FFFFFF" cx="260" cy="273.987" r="14.999"/>
				</g>
			</svg>
		);
	}

}

Logos.Kinetic = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<circle cx="200" cy="200" r="198.806"/>
				</g>
				<g>
					<path style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" d="M166.268,122.81
						c-3.999-4-10.486-4-14.486,0c-4,4.001-4,10.486,0,14.487"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="200" y1="156.542" x2="166.268" y2="122.81"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="268.706" y1="225.247" x2="214.486" y2="171.028"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="185.513" y1="171.028" x2="151.781" y2="137.297"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="246.975" y1="232.491" x2="200" y2="185.516"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="200" y1="279.467" x2="153.024" y2="232.491"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="185.513" y1="293.953" x2="131.294" y2="239.734"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="275.514" y1="383.954" x2="200" y2="308.44"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" x1="295.135" y1="374.603" x2="214.486" y2="293.953"/>
					<path fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5.9271" strokeLinecap="round" strokeLinejoin="round" d="M124.488,383.952
						l144.218-144.218c3.999-4,3.999-10.486,0-14.487c-4.001-4-10.488-4-14.488,0L104.863,374.603l8.875,5.308L124.488,383.952z"/>
					<path fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.017" strokeMiterlimit="10" d="M144.485,241.457
						c-4.119,4.119-10.796,4.118-14.915-0.001c-4.116-4.117-4.116-10.794,0-14.913l105.458-105.456c4.115-4.117,10.793-4.117,14.912,0
						c4.117,4.12,4.117,10.795,0,14.914L144.485,241.457H129.57c-4.116-4.118-4.116-10.795,0-14.914"/>
					<circle cx="200" cy="171.028" r="4.097"/>
					<circle cx="261.461" cy="232.491" r="4.098"/>
					<circle cx="200" cy="293.953" r="4.097"/>
					<circle cx="138.537" cy="232.491" r="4.098"/>
				</g>
			</svg>
		);
	}

}

Logos.ScalingTricksForGeo = class extends React.Component {

	render() {
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<path d="M353.722,324.998l-0.524-3.531l-0.576-4.36l-0.296-5.119l0.529-4.97l0.458-4.309l-0.241-4.622l-1.058-4.52
						l-2.828-2.777l-1.994-0.186l-1.273,1.109l-1.994-2.77l-0.133-6.545l1.152-2.399h3.527l4.475-1.613l4.105-1.281l4.035-1.015
						l-0.17-3.507l0.027-5.584v-3v-4.92l-0.691-3.387l-0.891-3.265l-1.76-4.482l-2.151-5.266l-1.771-4.283l-1.824-4.263l0.574-2.78
						l-1.045-6.334l-2.381-5.067c0,0-1.991-2.701-2.802-3.801s-2.979-2.229-2.979-2.229l-1.184,0.391l0.9,3.689l-0.988,3.153
						l-3.973,1.113l-1.992-2.967l-0.977-3.548l-1.124-3.971l-2.219-3.769l-2.948-2.989l-3.768-0.098l-1.684-3.597l-1.703-3.639
						l-1.895-4.049l-2.094-4.472l-1.266-4.628l-1.336-4.872l-1.331-4.854l-1.448-5.282l-3.967-2.776l-4.463-0.574l-4.125-0.533
						l-6.914-0.904l-4.818-1.404l-5.943-2.234c0,0-5.006-2.597-5.896-3.163s-3.906-3.188-3.906-3.188l-3.537-3.208l-3.762-3.412
						l-3.852-4.003l-1.511-4.318l-2.599-7.171l-3.217-3.612l-4.624-5.194l-3.038-3.724l-2.414-3.636l-1.583-2.874l-1.61-5.56
						l-2.892-3.461l69.104-71.896c-30.801-19.865-67.45-31.461-106.819-31.632C89.936,0.58,0.479,89.262,0.002,199.134
						c-0.477,109.873,88.204,199.331,198.076,199.806C260.91,399.213,317.065,370.329,353.722,324.998z"/>
				</g>
			</svg>
		);
	}

}

Logos.RipsawJs = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<path d="M52.823,216.145l28.07-104.892c60.312,16.145,120.623,32.289,180.938,48.437
						c7.327,1.961,11.676,9.492,9.716,16.821c-2.643,9.867-5.287,19.739-7.928,29.61c-1.604,6.01-7.053,10.188-13.28,10.185
						c-5.96-0.006-11.92-0.013-17.877-0.02c1.81-11.837-0.583-16.592-7.169-14.255c-3.647,3.835-7.777,8.582-12.382,14.237
						c1.813-11.836-0.577-16.592-7.162-14.252c-3.65,3.838-7.776,8.582-12.387,14.239c1.812-11.84-0.577-16.593-7.158-14.253
						c-3.652,3.837-7.782,8.578-12.387,14.239c1.81-11.842-0.577-16.597-7.166-14.257c-3.646,3.839-7.776,8.584-12.383,14.24
						c1.812-11.837-0.581-16.592-7.162-14.255c-3.652,3.837-7.777,8.583-12.387,14.239c1.81-11.838-0.577-16.591-7.16-14.256
						c-3.652,3.838-7.777,8.583-12.385,14.241c1.809-11.841-0.581-16.594-7.162-14.254c-3.65,3.834-7.779,8.583-12.385,14.237
						c1.811-11.837-0.58-16.592-7.164-14.254c-3.647,3.835-7.777,8.583-12.382,14.239C68.324,216.162,60.575,216.153,52.823,216.145z
						 M30.827,225.854c-9.305-2.487-18.612-4.979-27.919-7.471c8.898,95.366,84.854,170.66,180.302,178.723
						c95.442,8.062,182.948-53.423,207.718-145.95c24.771-92.526-20.314-189.507-107.024-230.208
						C197.197-19.751,93.786,7.522,38.429,85.692c9.307,2.491,18.614,4.984,27.917,7.446c7.331,1.962,11.68,9.492,9.718,16.82
						L47.648,216.14C45.688,223.47,38.158,227.819,30.827,225.854z"/>
					<path d="M23.629,110.17c3.028,0.812,6.051,1.619,9.075,2.43c7.331,1.962,11.684,9.492,9.72,16.822
						c-4.737,17.692-9.472,35.385-14.209,53.077c-1.962,7.329-9.491,11.677-16.82,9.716c-3.026-0.81-6.051-1.621-9.075-2.432
						C3.798,161.158,10.612,135.708,23.629,110.17z"/>
				</g>
			</svg>
		);
	}

}

Logos.Pba = class extends React.Component {
	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<path d="M199.135,398.939C89.263,398.465,0.582,309.007,1.059,199.134C1.536,89.262,90.992,0.58,200.865,1.059
						c109.872,0.478,198.554,89.934,198.076,199.806C398.463,310.736,309.008,399.418,199.135,398.939z"/>
				</g>
				<g>
					<g>
						<line style={noFill} stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="274.299" y1="153.781" x2="126.702" y2="245.93"/>
						<line style={noFill} stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="154.425" y1="126.056" x2="246.575" y2="273.653"/>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
							M220.44,114.906c0,0-18.53,41.45,0.615,72.116c19.146,30.664,64.093,33.517,64.093,33.517"/>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
							M116.711,179.668c0,0,45.377,1.549,64.521,32.216c19.146,30.665,1.973,72.301,1.973,72.301"/>
						<circle style={noFill} stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="200.497" cy="200" r="101.511"/>
					</g>
				</g>
			</svg>
		);
	}
}

Logos.GiraffeForRhino = class extends React.Component {
	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<path d="M200.001,398.927c-54.089,0-106.13-22.244-143.529-61.19l26.826-27.219c0.08-0.083,0.159-0.17,0.233-0.256
						c0,0,21.731-21.636,37.434-43.782s0.326-0.411,0.461-0.636c0,0,30.879-51.74,32.352-53.011s10.547-4.433,13.01-4.883
						s42.811,2.331,46.074,2.878s8.931,4.255,13.875,4.631c6.462,0.491,13.805-1.167,15.395-3.853
						c2.494-5.523-3.583-19.841-3.583-19.841c-0.312-1.174-1.049-2.191-2.066-2.854c0,0-20.763-13.142-27.56-17.964
						s-15.247-13.484-18.271-15.071c-3.296-1.73-10.522-0.805-12.086-1.882s-11.637-14.427-11.637-14.427
						c-0.958-1.187-2.378-1.833-3.835-1.833c-0.65,0-1.307,0.129-1.932,0.396c-2.025,0.865-3.232,2.973-2.951,5.159l1.426,11.034
						l-0.199,0.216l-9.905-6.521c-0.816-0.538-1.76-0.812-2.708-0.812c-0.646,0-1.297,0.128-1.911,0.386
						c-1.513,0.637-2.609,1.987-2.92,3.599c0,0-1.939,13.042-2.924,15.051s-52.413,53.109-72.407,71.101s-50.409,39.012-50.409,39.012
						c-10.075-24.193-15.18-49.85-15.18-76.353C1.073,90.312,90.312,1.073,200.001,1.073c109.689,0,198.928,89.239,198.928,198.928
						C398.929,309.689,309.69,398.927,200.001,398.927z"/>
				</g>
				<g class='psz-icons__eye'>
					<path d="M178.5,169.927c1.649-0.418,2.409-1.754,3.797-0.733c1.388,1.021,0.524,2.488,0.498,3.378
						s0.365,1.938-0.682,2.487s-2.487,0.079-3.613-0.628c-1.125-0.707-4.241-0.523-4.006-2.802
						C174.729,169.351,176.851,170.346,178.5,169.927z"/>
				</g>
			</svg>
		);
	}
}

Logos.AlgorithmicTattoo = class extends React.Component {
	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g>
					<circle cx="200" cy="200.712" r="199.221"/>
				</g>
				<g>	
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="101.845" y1="227.553" x2="57.569" y2="283.444"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="103.697" y1="226.295" x2="111.87" y2="215.977"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="215.549" y1="268.788" x2="145.937" y2="356.675"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="184.156" y1="174.92" x2="173.467" y2="188.412"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="215.254" y1="218.2" x2="219.224" y2="221.344"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="145.006" y1="223.729" x2="152.943" y2="230.016"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="115.039" y1="217.772" x2="112.659" y2="215.884"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="239.331" y1="198.495" x2="249.645" y2="206.666"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="234.052" y1="162.14" x2="228.495" y2="157.736"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="241.63" y1="218.317" x2="249.798" y2="207.996"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="158.312" y1="223.624" x2="153.276" y2="229.978"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="167.082" y1="184.105" x2="172.639" y2="188.508"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="107.135" y1="174.501" x2="95.227" y2="165.067"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="152.477" y1="144.918" x2="151.223" y2="146.505"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="149.075" y1="114.141" x2="211.232" y2="35.669"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="226.144" y1="136.052" x2="286.126" y2="60.326"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="100.737" y1="156.617" x2="95.078" y2="163.762"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="159.109" y1="286.446" x2="115.044" y2="342.077"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="284.985" y1="285.527" x2="222.381" y2="364.566"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="277.807" y1="222.625" x2="284.093" y2="214.688"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="88.149" y1="165.17" x2="49.19" y2="134.311"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="318.648" y1="209.954" x2="359.282" y2="158.656"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="284.093" y1="214.688" x2="318.648" y2="209.954"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="277.807" y1="222.625" x2="284.985" y2="285.527"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="211.811" y1="232.809" x2="215.549" y2="268.788"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="227.95" y1="157.799" x2="226.144" y2="136.052"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="152.477" y1="144.918" x2="149.075" y2="114.141"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="163.296" y1="158.131" x2="167.082" y2="184.105"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="184.156" y1="174.92" x2="218.519" y2="169.708"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="249.645" y1="206.666" x2="272.896" y2="204.693"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="219.254" y1="221.631" x2="241.63" y2="218.317"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="187.951" y1="220.046" x2="215.254" y2="218.2"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="158.312" y1="223.624" x2="167.774" y2="221.895"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="152.943" y1="230.016" x2="159.109" y2="286.446"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="176.042" y1="210.621" x2="172.639" y2="188.508"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="111.87" y1="215.977" x2="107.135" y2="174.501"/>
					<line style={noFill} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" x1="88.149" y1="165.17" x2="95.078" y2="163.762"/>
				</g>
			</svg>
		);
	}
}

Logos.PendantProject = class extends React.Component {

	render() {
		var noFill = { fill: 'none' };
		return (
			<svg className={this.props.className} viewBox="0 0 400 400">
				<g class="fill">
					<circle cx="200" cy="200" r="199.221"/>
				</g>
				<g class="Layer_1">
					<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M220.925,184.943
						c23.577,18.514,24.397,51.755,1.665,71.585c-19.776,17.252-50.489,18.067-71.004,1.954c-23.569-18.508-24.396-51.736-1.674-71.57
						C169.687,169.65,200.403,168.831,220.925,184.943z"/>
					<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M196.037,170.955
						c-1.807-0.762-2.893-2.84-1.526-4.677c1.14-1.538,3.315-1.839,4.886-1.179c1.806,0.76,2.889,2.838,1.523,4.676
						C199.782,171.311,197.605,171.613,196.037,170.955z"/>
					<g>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M171.863,284.825
							c16.347,3.116,33.791,0.683,48.812-7.394c14.849-7.984,27.735-21.891,32.384-40.346"/>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M253.059,237.086
							c0.472-1.866,0.848-3.747,1.132-5.66"/>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M254.19,231.426
							c4.262-28.69-13.045-52.307-35.023-63.1c-21.759-10.688-48.329-9.756-69.396,2.621c-21.356,12.544-36.807,37.58-30.393,65.835
							c6.191,27.265,29.6,43.68,52.484,48.043"/>
					</g>
					<g class="ring_2_">
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M200.442,165.75
							c-0.381,0.887-0.761,1.738-1.38,2.471c-0.96,1.131-1.366,0.195-1.421-1.09c-0.09-2.012,0.308-3.859,0.767-5.759
							c0.457-1.894,1.02-3.712,1.818-5.468c0.401-0.881,0.736-1.737,1.504-2.367c1.072-0.883,1.134,0.857,1.129,1.842"/>
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M202.858,155.38
							c-0.015,2.463-0.558,4.712-1.229,7.009"/>
					</g>
					<g class="thread_2_">
						<path style={noFill} stroke="#FFFFFF" strokeWidth="6" stroke-linecap="round" stroke-linejoin="round" d="M202.271,56.238
							c-11.322,3.758-21.878,8.106-31.541,16.229c-9.901,8.324-15.77,18.926-14.083,33.445c1.423,12.248,7.885,25.613,15.302,34.445
							c4.705,5.607,10.041,9.848,15.988,13.584c4.336,2.725,8.421,5.271,13.658,5.673c4.776,0.368,8.763-1.142,12.967-3.229
							c6.592-3.271,12.609-7.555,18.754-11.663c9.995-6.679,19.967-13.262,30.668-18.545c5.907-2.915,12.074-5.029,17.597-9.055
							c4.715-3.437,7.513-7.775,6.382-14.451c-0.865-5.119-3.113-9.101-5.688-13.205c-4.188-6.677-9.108-12.488-14.265-18.179"/>
					</g>
				</g>
			</svg>
		);
	}

}

module.exports = Logos;