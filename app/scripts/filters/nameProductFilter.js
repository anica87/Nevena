/**
 * Created by anicam on 02/12/2015.
 */

angular.module('angularCordovaApp')
  .filter('nameProduct', function(){
    return function(filterValue, authors){
      var matches = [];
      filterValue = filterValue.toLowerCase();

      for(var i = 0; i< authors.length; i++){
        var author = authors[i];
        if(author.ContactName.charAt(0) == filterValue)
        {
          matches.push(author);
        }
      }
      return matches;

    }
  });
