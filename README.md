Fluent Paging
===================

##Usage

###Basic usage

`` js
$(function () {
  $(window).fluentPaging({
    callback: function (page) {
      return $.get('page-' + page + '.html', function (html) {
        $('body').append(html);
      });
    }
  });
});
``

###Methods

Pause the paging:
``js 
$(window).fluentPaging('pause');
``

Resume the paging:
``js 
$(window).fluentPaging('resume');
``

Stop the paging:
``js 
$(window).fluentPaging('destroy');
``

##License

Copyright (c) 2013 Boaz den Besten

Licensed under the MIT license.


