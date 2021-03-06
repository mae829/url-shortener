'use strict';

function makeShort( event ) {

    event.preventDefault();

    var longUrl = $('#longurl').val(),
        str     = '';

    $('#output-table tbody').html('');

    var request = gapi.client.urlshortener.url.insert({
        'resource': {
            'longUrl': longUrl
        }
    });

    request.execute( function( response ) {

        if ( response.id !== null ) {

            str = '<tr>' +
                '<td>'+ response.longUrl +'</td>' +
                '<td><a target="_blank" href="'+ response.id +'">'+ response.id +'</a></td>' +
            '</tr>';

            $('#output-table tbody').append(str);

        } else {

            str = '<tr class="alert-danger">' +
                '<td>'+ longUrl +'</td>' +
                '<td><span class="glyphicon glyphicon-exclamation-sign"> </span> error</td>' +
            '</tr>';

            $('#output-table tbody').append(str);

        }

    } );

    return false;

}

function bulkShort( event ) {

    event.preventDefault();

    var longUrls  = $('#longurl').val(),
        splitUrls = longUrls.split(/\n+/g),
        str       = '';

    $('#output-table tbody').html('');

    $('#export')
        .removeAttr('disabled')
        .on('click',function() {

            $('#output-table').table2excel( {
                name: 'URLs Table',
                filename: 'url-export'
            } );

        } );

    $(splitUrls).each(function(i) {

        if ( splitUrls[i] !== '' ) {

            var request = gapi.client.urlshortener.url.insert({
                'resource': {
                    'longUrl': splitUrls[i]
                }
            });

            request.execute( function( response ) {

                if ( response.id !== null ) {

                    str = '<tr>' +
                        '<td>'+ ( i + 1 ) +'</td>' +
                        '<td>'+ response.longUrl +'</td>' +
                        '<td><a target="_blank" href="'+ response.id +'">'+ response.id +'</a></td>' +
                    '</tr>';

                    $('#output-table tbody').append(str);

                } else {

                    str = '<tr class="alert-danger">' +
                        '<td>'+ ( i + 1 ) +'</td>' +
                        '<td>'+ splitUrls[i] +'</td>' +
                        '<td><span class="glyphicon glyphicon-exclamation-sign"></span> error</td>' +
                    '</tr>';

                    $('#output-table tbody').append(str);

                }

            } );

        }

    } );

    return false;

}

function init(){

    gapi.client.setApiKey('AIzaSyAYAKuR7ALW3EhRgjywI4f2WIfVMPIH4-M'); //get your ownn Browser API KEY for GOOGLE URL Shortener service

    gapi.client.load('urlshortener', 'v1', function(){});

    $('#bulk-url-form').on('submit', bulkShort);

    $('#single-url-form').on('submit', makeShort);

}

$(window).load(init);
