@psz = {}

angular.module('psz', [])
	.controller 'projects', ($scope, $http) ->
		$http.get('assets/data/projects.json').success (projects) ->
			$scope.projects = projects