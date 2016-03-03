module.exports = function() {

	var suggestions = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: "search/suggestions.json"
	});

	function fetchSuggestions(q, sync) {
		if (q === '') {
			sync(suggestions.get(
				'developer', 'engineer', 'designer', 'tester'
			));
		} else {
			suggestions.search(q, sync);
		}
	}

	return {
		templateUrl: 'search/searchBar.template.html',
		link: function($scope, $element, $attrs) {
			$element.find('form').on('submit', function(e) {
				console.log($scope.searchInput);
				$scope.sendQuery($scope.searchInput);
			});

			$element.find('.inputSearch').typeahead({
				hint: true,
				highlight: true,
				minLength: 0
			}, {
				name: 'states',
				source: fetchSuggestions,
				templates: {
					empty: [
						'<div class="text-muted">',
						'No Suggestion',
						'</div>'
					].join('\n'),
					suggestion: function(data) {
						var templ = '<div class="list-group-item">' + '{{data}}</div>';

						return templ.replace(/{{data}}/g, data);
					}
				}
			});

			$element.find('.inputSearch')
				.on('focus', function() {
					$(this).select();
				})
				.bind('typeahead:select', function(e, sugg) {
					$scope.sendQuery(sugg);
				});

			$element.find('#searchLog .dropdown-menu').on('click', function(e) {
				e.stopPropagation();
			});
		},

		controller: ['$scope', function($scope) {
			$scope.waiting = false;
			$scope.searchLog = {};
			$scope.clear = function() {
				$scope.searchLog = {};
				$scope.$emit('searchInput.cleared');
				$scope.searchInput = '';
				setTimeout(function() { $scope.$apply(); }, 10);
			}

			$scope.$on("searchInput.status.waiting", function() {
				$scope.waiting = true;
				setTimeout(function() { $scope.$apply(); }, 10);
			});

			$scope.$on("searchInput.status.ready", function() {
				$scope.waiting = false;

				setTimeout(function() {
					$scope.$apply();
				},10);
			});

			$scope.sendQuery = function(query) {
				if (query) $scope.searchInput = query;
				if (!$scope.searchLog.hasOwnProperty(query) && typeof query !== 'undefined') {
					$scope.searchLog[query] = true;
				}

				var keywords = Object.keys($scope.searchLog);

				if (keywords.length > 0) {
					$scope.$emit('searchInput.submitted', keywords);
				} else {
					$scope.$emit('searchInput.log.clear');
				}
			}
		}]
	}
}