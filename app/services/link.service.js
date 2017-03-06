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

  service.getLinkByText = function(text) {
    return service.links.find(function(link) { return link.text === text });
  };

  service.addLink = function(text) {
    service.links.push({
      text: text,
      clicks: 0,
    });

    _storeLinks();
  };

  service.editLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      // if an editor is already open, then close it before opening a new one
      service.links.forEach(function(l) {
        l.editing = false;
      });

      // turn on editing for the given link
      service.links[index].editing = true;
    }
  };

  service.saveLink = function(link, text) {
    var index = service.links.indexOf(link);

    service.links[index].editing = false;
    service.links[index].text = text;

    _storeLinks();
  }

  service.removeLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      service.links.splice(index, 1);
    }

    _storeLinks();
  };

  service.incrementLink = function(link) {
    var index = service.links.indexOf(link);

    // increment the actual link click counter
    service.links[index].clicks += 1;

    _storeLinks();
  };

  // shared local method to store links array in localStorage as stringified JSON
  var _storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };

  return service;
});