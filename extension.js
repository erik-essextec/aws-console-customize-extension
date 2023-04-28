/**
 * AWS Console Customize Extension
 * Created by fumiharu kinoshita
 */
$(function() {
    // get username, account number, region

    var nameElm = $("#nav-usernameMenu span:first span:first");
    var name = nameElm.text();

    var nameElmTitle = nameElm[0].title.split(' @ ')
    var acct = nameElmTitle[nameElmTitle.length-1].replaceAll('-', '')

    var regions = location.search.match(/region=(.*?)(&|$)/);
    var region = "";
    if (regions != null && regions.length > 1) {
        region = regions[1];
    }

    // show/hide label
    $('#consoleNavHeader').hover(
            () => $('#ruleLabel').css('visibility', 'hidden'),
            () => $('#ruleLabel').css('visibility', '')
    );

    // load setting.
    chrome.storage.sync.get(['awsconsole'], function(ruleList) {
        ruleList.awsconsole.some(rule => {
          if (rule.enableRule && (rule.user == acct)) {
                if (region == rule.region || "all-region" == rule.region) {
                    // apply rule.

                    $('#awsc-nav-header > nav').css('background-color', rule.color);
                    $('#console-nav-footer-inner').css('background-color', rule.color);

                    if (rule.showLabel && rule.label != null && rule.label.length > 0) {
                        $('body').prepend('<span id="ruleLabel">' + rule.label + '</span>');
                    }
                    return true;
                }
            }
        });
    });
});
