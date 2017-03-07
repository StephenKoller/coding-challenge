angular.module('grapeviin')
.service('SortService', function() {
  // supply a default
  var service = {
    options: {
      type: 'clicks',
      reverse: false
    }
	};

  // Read
  service.getOptions = function () {
    var _options = localStorage.getItem('sortOptions');
    if(_options != null) {
      service.options = JSON.parse(_options);
    }
  };

  // Update
  service.setOptions = function (sortOptions) {
    service.options = sortOptions;
    localStorage.setItem('sortOptions', JSON.stringify(service.options));
  }

  return service;
});