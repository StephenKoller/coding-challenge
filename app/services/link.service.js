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

    service.storeLinks();
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

    service.storeLinks();
  }

  service.removeLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      service.links.splice(index, 1);
    }

    service.storeLinks();
  };

  service.storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };

  service.incrementLink = function(link) {
    var index = service.links.findIndex(function(el) { return el.text === link.text});

    // increment the actual link click counter
    service.links[index].clicks += 1;

    service.storeLinks();
  };

  return service;
});