var App = function() {
    function init() {
        dragSidebar();
    }

    function dragSidebar() {
        $(document).on('scroll', function() {
            if($(this).scrollTop() > 800) {
                $('#sidebar').addClass('drag-sidebar');
            } else {
                $('#sidebar').removeClass('drag-sidebar');
            }
        });
    }

    return {
        init: init
    }
}();

App.init();