/*jslint es5: true, browser: true, devel: true */
/*jshint multistr:true */
/*global $, BOMACHI: true */


// T.A. - sort Labour contracts
// T.A. - check the Footer button code


BOMACHI = (function (my) {
    'use strict';

    my.censsaxxxprofile = function (custType) {

        function formatLaborContracts() {
    
    /*
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
    */
    
            return;
        }


        var $workingHTML,
            $bomaSection,
            $bucket_button,
            $edit_button,
            $workspace,
            cname,
            cid,
            aNameClass = {                    // set the grid width, depending on customer type
                CMP: 'pure-u-3-8',
                IND: 'pure-u-1-4'
            },
            aValClass = {
                CMP: 'pure-u-13-24',
                IND: 'pure-u-2-3'
            },
            aPrefClass = {
                CMP: 'pure-u-1-12',
                IND: 'pure-u-1-12'
            };


    // bomachi_Hdr
        // display Customer ID & Name in standardized fashion on page header

        switch (custType) {
        case 'IND':
            cid = $('#aaCenssaprofileDispProfDtlContactInformation')
                .find('ul form input[name="p_cust_id"]')
                .attr('value');
            cname = $('#aaProfileFirstNm')
                .find('.aaProfileDataWrapper p')
                .text()
                + ' '
                + $('#aaProfileLastNm')
                    .find('.aaProfileDataWrapper p')
                    .text();
            break;
        case 'CMP':
            $workingHTML = $('#aaCenssaprofileCmpHdrTbl')
                .find('tbody tr');
            cid = $workingHTML
                .find('td:first-of-type')
                .text();
            cname = $workingHTML
                .find('td:last-of-type')
                .text();
            break;
        }

        my.pageHeader({'name': cname, 'id': cid});

    // bomachi_Body
        $bomaSection = $(my.sections.bdyID);

        $bomaSection
            .removeClass('pure-g')
            .append('<section id="bomachi_tabbedContent" class="pure-g">\
                      <div id="bomachi_vNav" class="pure-u-1-6"><ul></ul></div>\
                      <div id="bomachi_eachContent" class="pure-u-5-6"></div>\
                      </section>');

        $(my.srcContainerID).find('.aaCenssaprofile').each(function (idx) {
            var thisID,
                $bucket_head;

            thisID = $(this).attr('id');
            $bucket_head = $('#' + thisID)
                .find('.aaHeaderwrapper .aaHeading h3')
                .html();
            $bucket_button = my.extractButton('#' + thisID + ' .aaHeaderwrapper .aaHeading .aaCenssaprofileSubmit li input', 'right');
            $edit_button = $bucket_button.bomabutton;

            $('#bomachi_eachContent')
                .append('<div class="pure-g aaCenssaprofile ' + thisID + '">\
                         <div class="pure-u-7-8"><h3>' + $bucket_head + '</h3></div>\
                         <div class="pure-u-2-24">' + $edit_button + '</div>\
                         </div>');

            $(this)
                .find('.aaFormFields>li').each(function () {
                    var attrname = '<div class="bomachi_attrname">'
                                    + $(this).find('label').html()
                                    + '</div>',
                        attrval = '<div class="bomachi_attrval">'
                                    + $(this).find('.aaProfileDataWrapper p').html()
                                    + '</div>',
                        tickfull = '<div class="bomachi_prefflag"><span class="tickmark">\
                                    <div class="stem"></div><div class="kick"></div></span>\
                                    </div>',
                        ticknone = '<div class="bomachi_prefflag"></div>',
                        tickmark = $(this).find('.aaProfileDataWrapper + img').length ? tickfull : ticknone;

                    $('#bomachi_eachContent  .' + thisID).last()
                        .append(attrname + attrval + tickmark);
                });

            $workspace = $('#bomachi_vNav').find('ul');
            $(this)
                .find('h3').each(function () {                      // Section description, e.g. Contact information
                    $workspace.append('<li data-bomachiTab=' + idx + '>' + $(this).text() + '</li>');
                });

        });

        $($bomaSection)
            .find('.bomachi_attrname')
                .addClass(aNameClass[custType])
                .end()
            .find('.bomachi_attrval')
                .addClass(aValClass[custType])
                .end()
            .find('.bomachi_prefflag')
                .addClass(aPrefClass[custType]);

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

        if (custType === 'CMP') {
            formatLaborContracts();
        }

    // bomachi_Ftr

        $bomaSection = $(my.sections.ftrID);

        $bucket_button = my.extractButton('#aaCenssaprofileDispProfSbmtBtn .aaCenssaprofileSubmit li input', 'center');
        $('#aaCenssaprofileDispProfSbmtBtn ul').remove();

        $bomaSection
            .append('<div class="bomachi_footerButtonText">' + $('#aaCenssaprofileDispProfSbmtBtn').html() + '</div>');

        $bomaSection
            .append($bucket_button.bomabutton);

// profile page helper function
        $(function () {
            var $tabControls = $('#bomachi_vNav')
                    .find('ul:first-of-type li'),
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
    };




    return my;

}(BOMACHI));
