/*jslint browser: true */
/*global  $, BOMACHI: true*/


BOMACHI = (function (my) {
    'use strict';

    my.censsacustbio = function () {

        var $workingHTML,
            $bomaSection,
            cname,
            cid,
            cphoto,
            biodate;

    // Obtain Key Elements used in both Hdr & Bdy from the aaBioInfo ID.

        $workingHTML = $('#aaBioInfo')
                        .find('ul');

        cname = $($workingHTML)                                 // Hdr
                    .find('li:first')
                        .contents()
                            .filter(function () {
                                return this.nodeType === 3;         // text nodes only, excludes LABEL tag
                            })
                        .text();

        biodate = $($workingHTML)                               // Bdy
                    .find('li:last')
                        .contents()
                            .filter(function () {
                                return this.nodeType === 3;         // as above
                            })
                        .text();


    // bomachi_Hdr
        $workingHTML = $('#aaBioActionLink')
                            .find('a')
                            .attr('href');

        cid = $workingHTML.replace(/[^0-9]+([0-9]+).+/, "$1");

        cphoto = $('#aBioPicActual').html();

        my.pageHeader({'name': cname, 'id': cid, 'opt3': cphoto});


    // bomachi_Body
        $workingHTML = '<h3>' + $('#aaBioTitle').text() +
                        '<span>(Last Updated: ' + biodate + ')</span></h3>' +
                        '<p>' + $('#aaBioText').text() + '</p>';

        $(my.sections.bdyID)
            .append($workingHTML);


    // bomachi_Ftr
        $bomaSection = $(my.sections.ftrID);
        $bomaSection
            .append('<div class="bomachi_centerButton">' + $('#aaBioActionLink').find('ul li').html() + '</div>');
        $bomaSection
            .find('label')
                .remove()
            .end()
            .find('a')
                .addClass('pure-button buttonIsShadowed');

        return;

    };

    return my;

}(BOMACHI));
