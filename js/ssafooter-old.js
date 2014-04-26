/*jslint browser: true*/
/*global  $*/
//  BOMA/Chicago Custom JavaScript for SSA pages - presumes continued use of jQuery

//  April 2014 (AA v7.1.4)
//  Mark Niemczyk


var BOMACHI_transform = true;       // if true, apply transformations

var BOMACHI = {

    init: function () {
        'use strict';
/*
            If the SSA page has been embedded via the iframe element, which is how these
            pages are included in the bomachicago web site, perform layout & styling
            transformations.
*/

        var ssaPage,
            url;

        if (parent !== window) {
            url = window.location.pathname;
            ssaPage = url.split('/').reverse()[0];
            this.customizePageLayout(ssaPage);
        }

        return;
    },





    formatCustProfile: function ($originalHTML) {
        'use strict';

/*        function transformEach_li($ssaprof_li) {
            var $preferredTick = $ssaprof_li.find('img'),
                $dest;

            $dest = $('#bomachi_eachContent .aaCenssaprofile').last();
            $dest.append('<div class="pure-u-6-24"><div class="bomachi_attrName">' + $ssaprof_li.find('label').text() + $ssaprof_li.find('label').length  + '</div></div>');

            $dest.append('<div class="pure-u-2-3"><div class="bomachi_attrValue">' + $ssaprof_li.find('.aaProfileDataWrapper').html() + '</div></div>');

            if ($preferredTick.length > 0) {
                $dest.find('.aaCenssaprofile').last()
                    .append('<div class="pure-u-1-12"><div class="bomachi_attrPreferred">' + $preferredTick + '</div></div>');
            }

            return;
        }
*/
        var $bomaSection,
            $profile_buckets;

// bomachi_Body
        $bomaSection = $('#bomachi_Body');

        $profile_buckets = $originalHTML.find('.aaCenssaprofile');

        $bomaSection
            .addClass('pure-g ')
            .append('<section id="bomachi_tabbedContent"><div id="bomachi_vNav" class="pure-u-1-6"><ul></ul></div><div id="bomachi_eachContent" class="pure-u-5-6"></div></section>');

        $profile_buckets.each(function (idx) {
            var thisID = $(this).attr('id');
            $('#bomachi_eachContent')
                    .append('<div class="pure-g aaCenssaprofile ' + thisID + '"></div>');
            $(this)
                .find('.aaFormFields .aaHeading h3').each(function () {
                    $('#bomachi_eachContent .aaCenssaprofile').last()
                        .append('<div class="msn pure-u-7-8"><h3>' + $(this).html() + '</h3></div>');
                })
                .end()
                .find('.aaFormFields .aaHeading aaCenssaprofileSubmit li').each(function () {
                    $('#bomachi_eachContent .aaCenssaprofile').last()
                        .append('<div class="msn pure-u-2-24">' + $(this).html() + '</div>');
                });

            $(this)
                .find('.aaFormFields>li').each(function () {
                    $(this)
                        .find('label').each(function () {
                            $('#bomachi_eachContent .aaCenssaprofile').last()
                                .append('<div class="bomachi_attrname pure-u-1-4">' + $(this).html() + '</div>');
                        })
                        .end()
                        .find('.aaProfileDataWrapper p').each(function () {
                            $('#bomachi_eachContent .aaCenssaprofile').last()
                                .append('<div class="bomachi_attrval pure-u-2-3">' + $(this).html() + '</div>');
                        })
                        .end()
                        .find('.aaProfileDataWrapper + img').each(function () {
                            var tickmark = '<span class="tickmark"><div class="stem"></div><div class="kick"></div></span>';
                            $('#bomachi_eachContent .aaCenssaprofile').last()
                                .append('<div class="msn pure-u-1-12">' + tickmark + '</div>');
                        });
                });

            $(this)
                .find('h3').each(function () {                      // Section description, e.g. Contact information
                    $('#bomachi_vNav ul').append('<li data-bomachiTab=' + idx + '>' + $(this).text() + '</li>');
                });
        });


        $('#bomachi_vNav')
            .find('ul li:first-child')
                .addClass('first current')
                .end()
            .find('ul li:last-child')
                .addClass('last');

        $('#bomachi_eachContent .aaCenssaprofile').each(function (idx) {
            $(this).attr('data-bomachiTab', idx);
            if (idx === 0) {
                $(this).addClass('current');
            }
        });


// bomachi_Ftr
        $('#bomachi_Ftr')
            .append($originalHTML.find('form').last().html());


// helper function
        $(function () {
            var $tabControls = $('#bomachi_vNav ul:first-of-type li'),
                $tabWorkspace = $('#bomachi_tabbedContent [data-bomachiTab]');

            $tabControls.each(function () {
                $(this).click(function () {
                    //remove previous class and add it to clicked tab
                    if (!$(this).hasClass('current')) {
                        var itemNbr = $(this).attr('data-bomachiTab');
                        $tabWorkspace.removeClass('current');
                        $('[data-bomachiTab = ' + itemNbr + ']').addClass('current');
                    }
                });
            });
        });

        return;
    },

    formatButtons: function () {
        'use strict';

        $('#bomachi_Styled input[value="Edit"]')
            .addClass('pure-button')
            .wrap('<div class = "bomachi_rightButton"></div>');

        $('#bomachi_Styled input[value="Confirm"]')
            .addClass('pure-button')
            .wrap('<div class = "bomachi_centerButton"></div>');

        return;
    },

    formatLaborContracts: function () {
        'use strict';

        $('#aaCenssaprofileDispProfDtlLaborContracts')
            .addClass('block-group')
            .find('.aaProfileAttr, .aaProfileAttrCvar, .aaProfileAttrNvar')
                .addClass('block')
                .end()
            .find("li.aaProfileAttrNvar").find("div.aaProfileDataWrapper").each(function () {
                if ($(this).html() === '<p></p>') {
                    $(this).html('<p>&nbsp</p>');
                }
            });

        return;
    }
};

$(document).ready(function () {
    'use strict';

    if (BOMACHI_transform) {
        BOMACHI.init();
    }

    return;
});
