angular.module('grapeviin')
.service('LinkService', function() {
	var service = {
    links: []
	};

  // Get all
  service.getLinks = function() {
    var _links = localStorage.getItem('links');
    if(_links != null) {
      service.links = JSON.parse(_links);
    }
  };

  // Get one
  service.getLinkByText = function(text) {
    return service.links.find(function(link) { return link.text === text });
  };

  // Create
  service.addLink = function(text) {
    service.links.push({
      text: text,
      clicks: 0,
    });

    _storeLinks();
  };

  // Turn on editing
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

  // Update
  service.saveLink = function(link, text) {
    var index = service.links.indexOf(link);

    service.links[index].editing = false;
    service.links[index].text = text;

    _storeLinks();
  }

  // Delete
  service.removeLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      service.links.splice(index, 1);
    }

    _storeLinks();
  };

  // Update: Add to view / click counter
  service.incrementLink = function(link) {
    var index = service.links.indexOf(link);

    service.links[index].clicks += 1;

    _storeLinks();
  };

  // Local helper method to store links array
  var _storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };
  
  service.getLinks();
  return service;
});