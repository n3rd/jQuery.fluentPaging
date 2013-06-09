Fluent Paging
===================

##Usage

``` js
$(function () {
  $(window).fluentPaging({
    callback: function (page) {
      return $.get('page-' + page + '.html', function (html) {
        $('body').append(html);
      });
    }
  });
});
````

##License

Copyright (c) 2013 Boaz den Besten

Licensed under the MIT license.


