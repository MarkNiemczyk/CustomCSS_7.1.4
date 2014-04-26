/*jslint es5: true, browser: true, devel: true */
/*jshint multistr:true */
/*global $ */

//  BOMA/Chicago Custom JavaScript for SSA pages - presumes continued use of jQuery
//  April 2014 (AA v7.1.4)
//  Mark Niemczyk

// T.A. - reinstate iFrame check

var BOMACHI_transform = true; // if true, apply transformations

var BOMACHI = (function () {
    'use strict';

    var my = {
        destContainer: 'bomachi_Styled',
        destContainerID: '#bomachi_Styled',
        srcContainerID: '#aaSuperResponsiveContainer',
        sections: {
            hdr: 'bomachi_Hdr',
            hdrID: '#bomachi_Hdr',
            bdy: 'bomachi_Bdy',
            bdyID: '#bomachi_Bdy',
            ftr: 'bomachi_Ftr',
            ftrID: '#bomachi_Ftr'
        },
        hide4now: 'hide4now'
    };

    my.init = function () {
        var url;

        if (true) { // (parent !== window) { //If the SSA page has been embedded via the iframe element
            $(my.srcContainerID)
                    .addClass(my.hide4now);
            url = window.location.pathname;
            my.customizePageLayout(url.split('/').reverse()[0]);
        }
    };

    return my;

}());
