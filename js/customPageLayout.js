/*jslint es5: true, browser: true, devel: true */
/*jshint multistr:true */
/*global $, BOMACHI: true */


// t.a. - rethink hide4now


BOMACHI = (function (my) {
    'use strict';

/*
    function msn_debug(stepid) {
        var msg;
        msg = ($('#' + my.sections.bdy).find('#aaCenssaprofileCmpHdrTbl').length) ? 'Found' : 'Not yet';
        console.log(stepid + ' : ' + msg);
    }
*/

    my.customizePageLayout = function (ssaPage) {

        var ssaPackage;

        if (my.$originalHTML.find('form').attr('method') === 'POST') {
            return;
        }

        ssaPackage = ssaPage.split('.')[0];

    //  Initial page set-up
        $('body').prepend('<section id="' + my.destContainer + '" class="' + my.hide4now + '"></section>');
        $(my.destContainerID)
            .addClass(ssaPackage)
            .addClass(my.hide4now)
            .append('<section id="' + my.sections.hdr + '" class="pure-g"></section>\
                     <section id="' + my.sections.bdy + '" class="pure-g"></section>\
                     <section id="' + my.sections.ftr + '" class="pure-g"></section>');

        switch (ssaPackage) {
        case 'ssaauthmenu':                 // Top-level menu, only used if SSA sign-in via AA
            $(my.srcContainerID)
                    .removeClass(my.hide4now);
            break;

        case 'censsacustbio':               // Update My Bio
            my.censsacustbio();
            break;

        case 'censsacmpprofile':            // Company Profile, Building Profile
            my.censsaxxxprofile('CMP');
            break;
        case 'censsaindprofile':            // Update My Profile
            my.censsaxxxprofile('IND');
            break;

        case 'arssacustacct':               // Invoice History / Print non-Dues Invoices
        case 'arssainvpay':                 // Pay non-Dues Invoices
        case 'bomachimemrnwfndadm':         // Pay 2014 Membership Dues
        case 'censsacmpadmin':              // Company/Building Employee Administration

        case 'censsacustdirectorypref':     // Membership Directory Preferences
        case 'censsamngemp':                // Manage My Employment
        case 'ecmssacustcomm':              // Communication Preferences
        case 'evtssaregconsole':            // Event Registration Adjustments, My Event Registrations
        case 'fndssaord':                   // Contributions
            break;
        default:
            break;
        }

        // formatACGIButtons();

        if (ssaPackage !== 'ssaauthmenu') {
            $(my.destContainerID)
                .removeClass(my.hide4now);
        }

        return;

    };

    return my;

}(BOMACHI));
