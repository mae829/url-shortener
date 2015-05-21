'use strict';

function makeShort(){
  var longUrl = $('#longurl').val(),
      str     = '';

  $('#output-table tbody').html('');

  var request = gapi.client.urlshortener.url.insert({
    'resource': {
      'longUrl': longUrl
    }
  });
  request.execute(function(response){
    if(response.id != null){
      var str = '<tr><td>'+response.longUrl+'</td>';
      str += '<td><a href=\"'+response.id+'\">'+response.id+'</a></td></tr>';
      $('#output-table tbody').append(str);
    }
    else{
      $('#output-table tbody').append('<tr><td>error</td><td>error</td></tr>');
    }
  });
}
function bulkShort(){
  var longUrls  = $('#longurl').val(),
      splitUrls = longUrls.split(/\n+/g),
      str       = '';

  $('#output-table tbody').html('');

  for(var i=0; i < splitUrls.length; i++){
    if(splitUrls[i] != ''){
      var request = gapi.client.urlshortener.url.insert({
        'resource': {
          'longUrl': splitUrls[i]
        }
      });
      request.execute(function(response){
        if(response.id != null){
          str = '<tr><td>'+response.longUrl+'</td>';
          str += '<td><a href=\"'+response.id+'\">'+response.id+'</a></td></tr>';
          $('#output-table tbody').append(str);
        }
        else{
          $('#output-table tbody').append('<tr><td>error</td><td>error</td></tr>');
        }
      });
    }
  }
}
function init(){
	gapi.client.setApiKey('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); //get your ownn Browser API KEY for GOOGLE URL Shortener service
	gapi.client.load('urlshortener', 'v1',function(){});
}
$(window).load(init);
