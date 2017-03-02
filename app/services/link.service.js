angular.module('grapeviin')
.service('LinkService', function() {
	var service = {
    links: [
        {
          text: 'foo',
          clicks: 0,
        },
        {
          text: 'bar',
          clicks: 0,
        }
      ]
	};

  service.getLinks = function() {
    var localLinks = localStorage.getItem('links');
    if(localLinks != null) {
      service.links = JSON.parse(localLinks);
    }
  };

  service.addLink = function(text) {
    service.links.push({
      text: text,
      clicks: 0,
    });

    service.storeLinks();
  };

  service.saveLink = function(index, text) {
    service.links[index].editing = false;
    service.links[index].text = text;

    service.storeLinks();
  }

  service.removeLink = function(index) {
    if (index > -1) {
      service.links.splice(index, 1);
    }

    service.storeLinks();
  };

  service.storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };

  return service;
});