/*! jQuery.fluentPaging 0.1.0 | (c) Boaz den Besten | MIT Licence
*/(function ($, undefined) {

    var FluentPaging = (function (scope, options) {
        var $scope = $(scope);

        var defaults = {
            /* loadPageCallback must return a promise, if the promise fails to resolve paging will be stopped
             *  the first argument is the page to load */
            loadPageCallback: undefined,
            prefill: true, // if there is no scrollbar yet, load content until there is
            bottom: 0, // px from bottom to start loading next page
            loaderSelector: undefined, // jQuery selector, will be shown during the loading of a page
            nextPageSelector: undefined, // jQuery selector, loadNextPage will be bound onclick
            debug: false // print debug info to the console
        };

        var options = $.extend({}, defaults, options);

        var currentPage = 0;

        var paused = false;

        var contentCheck = function () {
            if (options.debug)
                console.log('contentCheck');

            if (!paused
                && $(window).scrollTop() >= $(document).height() - $(window).height() - options.bottom) {
                loadNextPage();
            }
        };

        var doPaging = function (page) {
            var wasPaused = paused;
            paused = true;

            if (options.loadPageCallback) {

                $(options.loaderSelector).show();

                var result = options.loadPageCallback(page);
                result.then(function () {
                    if (options.debug)
                        console.log('page ' + page + ' succeeded');

                    $(options.loaderSelector).hide();

                    if (!wasPaused) {
                        paused = false;
                    }

                    contentCheck();
                }, function () {
                    if (options.debug)
                        console.log('page ' + page + ' failed');

                    if (options.nextPageSelector) {
                        $(options.nextPageSelector)
                            .hide();
                    }

                    $(options.loaderSelector).hide();
                    stopPaging();
                });
            }
        };

        var loadNextPage = function () {
            doPaging(++currentPage);
        };

        var stopPaging = function () {
            $scope.off('scroll.fluentpaging');

            if (options.debug)
                console.log('paging stopped');
        };

        var run = function () {
            $scope.on('scroll.fluentpaging', contentCheck);
            $(options.loaderSelector).hide();

            if (options.nextPageSelector) {
                $(options.nextPageSelector)
                    .on('click', loadNextPage);
            }

            if (options.prefill) {
                loadNextPage();
            }
        };

        var pause = function () {
            paused = true;
        };

        var resume = function() {
            paused = false;
        };

        return {
            run: run,
            loadNextPage: loadNextPage,
            pause: pause,
            resume: resume,
            stopPaging: stopPaging
        };
    });

    $.fn.fluentPaging = function (options) {

        return this.each(function() {
            if(typeof options === 'object') {
                var instance = new FluentPaging(this, options);
                instance.run();
                $.data(this, 'fluentpaging', instance);
            } else if (typeof options === 'string') {
                var instance = $.data(this, 'fluentpaging');

                switch(options) {
                    case 'destroy':
                        $.data(this, 'fluentpaging', null);
                        instance.stopPaging();
                        instance = null;
                        break;
                    default:
                        instance[options]();
                }
            }
        });
    };

})(jQuery);