/*jslint es5: true, browser: true, devel: true */
/*jshint multistr:true */
/*global $, BOMACHI: true */


BOMACHI = (function (my) {
    'use strict';

    my.extractButton = function (searchCriteria, buttonPosition) {
//      Helper function to extract input tags for buttons; many of which are embedded
//      within a <ul> element.
//
//      Wraps the extracted <input> tag within a <div> and assigns bomachi classes
//      for styling.
//
//      Return properties:
//              found:      true or false, denoting whether the tag was located.
//              bomabutton: the tag, or an empty string if not found.


        var $work_button,
            $edit_button,
            wrapWithClass,
            boma_button = {};

        $work_button = $(searchCriteria).first();
        if ($work_button.length === 0) {
            boma_button.found = false;
            boma_button.bomabutton = '';
            return boma_button;
        }

        boma_button.found = true;

        switch (buttonPosition) {

        case 'left':
            wrapWithClass = '<div class="bomachi_leftButton">';
            break;
        case 'center':
            wrapWithClass = '<div class="bomachi_centerButton">';
            break;
        case 'right':
            wrapWithClass = '<div class="bomachi_rightButton">';
            break;
        default:
            wrapWithClass = '<div>';
            break;
        }

        $edit_button = $work_button.clone()
            .addClass('pure-button buttonIsShadowed');

        boma_button.bomabutton = $($edit_button)
            .wrap(wrapWithClass)
            .parent()
            .wrap('<div>')
            .parent()
            .html();

        return boma_button;

    };

    my.pageHeader = function (options) {
//      Standardized page header, with customer name & ID

        var working_html,
            defaults = {
            name: 'No name specified',
            id: 'No ID present',
            opt3: null
        };

        options = $.extend({}, defaults, options);

        working_html = '<div class = "pure-u-3-24">\
                        </div>\
                        <div class = "pure-u-17-24 bomachi_pg_customer">\
                            <div class = "pure-g">\
                                <div class = "pure-u-2-3 bomachi_pg_name">\
                                    <span>Name:</span>' + options.name +
                               '</div>\
                                <div class = "pure-u-1-3 bomachi_pg_id">\
                                    <span>ID:</span>' + options.id +
                               '</div>\
                            </div>\
                        </div>';
                        
        if (options.opt3 === null) {
            working_html = working_html + '<div class = "pure-u-1-6 bomachi_pg_optional"></div>';
        } else {
            working_html = working_html + '<div class = "pure-u-1-6 bomachi_pg_optional">\
                            <div>' + options.opt3 +
                            '</div>\
                        </div>';
        }
                        

        $('#' + my.sections.hdr).append(working_html);

        return;

    };

    return my;

}(BOMACHI));
