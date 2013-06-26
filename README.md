Fluent Paging
===================

##Usage

###Basic usage

``` js
$(function () {
  $(window).fluentPaging({
    loadPageCallback: function (page) {
      return $.get('page-' + page + '.html', function (html) {
        $('body').append(html);
      });
    }
  });
});
```

###Methods

Pause the paging: 
```js 
$(window).fluentPaging('pause');
```

Resume the paging:
```js 
$(window).fluentPaging('resume');
```

Manually load the next page:
```js
$(window).fluentPaging('loadNextPage');
```

Stop the paging:
```js 
$(window).fluentPaging('destroy');
```

##License

Copyright (c) 2013 Boaz den Besten

Licensed under the MIT license.


