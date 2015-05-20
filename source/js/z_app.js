'use strict';

/*function appendResults(text) {
  var results = document.getElementById('results');
  results.appendChild(document.createElement('p'));
  results.appendChild(document.createTextNode(text));
}

function makeRequest() {
  var request = gapi.client.urlshortener.url.insert({
    'resource':{
      'longUrl': 'http://culturatiresearch.com'
    }
  });
  request.then(function(response) {
    appendResults(response.result.shortUrl);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

function init() {
  gapi.client.setApiKey('AIzaSyAYAKuR7ALW3EhRgjywI4f2WIfVMPIH4-M');
  gapi.client.load('urlshortener', 'v1').then(makeRequest);
}

$(window).load(init);
*/

function makeShort(){
  var longUrl = $('#longurl').val();
  var request = gapi.client.urlshortener.url.insert({
    'resource': {
      'longUrl': longUrl
    }
  });
  request.execute(function(response){

    if(response.id != null){
      str ='<b>Long URL:</b> '+longUrl+'<br>';
      str +='<b>Short URL:</b> <a href=\"'+response.id+'\">'+response.id+'</a><br>';
      $('#output').html(str);
    }
    else{
      console.log(response);
    }
  });
}

function init(){
	gapi.client.setApiKey('AIzaSyAYAKuR7ALW3EhRgjywI4f2WIfVMPIH4-M'); //get your ownn Browser API KEY
	gapi.client.load('urlshortener', 'v1',function(){});
}
$(window).load(function(){
  init();
});
