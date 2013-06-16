(function ($, undefined) {

    var FluentPaging = (function (scope, options) {
        var $scope = $(scope);

        var defaults = {
            /* callback must return a promise, if the promise fails to resolve paging will be stopped
             *  the first argument is the page to load */
            callback: undefined,
            prefill: true, // if there is no scrollbar yet, load content until there is
            bottom: 0, // px from bottom to start loading next page
            loaderSelector: undefined, // jQuery selector, will be shown during the loading of a page
            debug: false // print debug info to the console
        };

        var options = $.extend({}, defaults, options);

        var currentPage = 0;

        var pauzed = false;

        var contentCheck = function () {
            if (options.debug)
                console.log('contentCheck');

            if (!pauzed
                && $(window).scrollTop() >= $(document).height() - $(window).height() - options.bottom) {
                doPaging(++currentPage);
            }
        };

        var doPaging = function (page) {
            pauzed = true;

            if (options.callback) {

                $(options.loaderSelector).show();

                var result = options.callback(page);
                result.then(function () {
                    if (options.debug)
                        console.log('page ' + page + ' succeeded');

                    $(options.loaderSelector).hide();
                    pauzed = false;
                    contentCheck();
                }, function () {
                    if (options.debug)
                        console.log('page ' + page + ' failed');

                    $(options.loaderSelector).hide();
                    stopPaging();
                });
            }
        };

        var stopPaging = function () {
            $scope.off('scroll.fluentpaging');

            if (options.debug)
                console.log('paging stopped');
        };

        var run = function () {
            $scope.on('scroll.fluentpaging', contentCheck);
            $(options.loaderSelector).hide();

            if (options.prefill) {
                doPaging(++currentPage);
            }
        };

        return {
            run: run
        };
    });

    $.fn.fluentPaging = function (options) {
        return this.each(function () {
            new FluentPaging(this, options).run();
        });
    };

})(jQuery);