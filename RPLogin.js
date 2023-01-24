var rxRP = new RegExp("(rp|altru)(.+)(\.blackbaudhosting\.com)"); //("(rp).+\.blackbaudhosting\.com");


    if (window.location.href.substr(0, 44) == "https://login.blackbaudondemand.com/?SiteID=")
    {
        window.location.href += "RP";
    }
    else if (rxRP.test(window.location.hostname) == false)
    {
        var theURL = "https://login.blackbaudondemand.com/?SiteID=";
        theURL += prompt("Please enter the Site ID");
        window.location.href = theURL;
    }
    else if ((window.location.href.indexOf("&useADcredentials=true") > -1))
    {
        // #region Date Stuff START http://stackoverflow.com/a/26426761/1342479
        Date.prototype.isLeapYear = function()
        {
            var year = this.getFullYear();
            if((year & 3) !== 0) return false;
            return ((year % 100) !== 0 || (year % 400) === 0);
        };

        // Get Day of Year
        Date.prototype.getDOY = function()
        {
            var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            var mn = this.getMonth();
            var dn = this.getDate();
            var dayOfYear = dayCount[mn] + dn;
            if(mn > 1 && this.isLeapYear()) dayOfYear++;
            return dayOfYear;
        };
        // #endregion Date Stuff END http://stackoverflow.com/a/26426761/1342479

        //Placeholder
        var p = '';

        //Dates
        var t = new Date().getDOY();
        var year  = new Date().getFullYear();

        // http://aa.usno.navy.mil/data/docs/EarthSeasons.php
        // http://aa.usno.navy.mil/seasons?year=2018&tz=-5&dst=0

        var SprM = 3;  var SprD = 20; // First Equinox
        var SumM = 6;  var SumD = 21; // First Solstice
        var AutM = 9;  var AutD = 22; // Second Equinox
        var WinM = 12; var WinD = 21; // Second Solstice

        var Spr = new Date( SprM + '/' + SprD + '/' + year).getDOY();
        var Sum = new Date( SumM + '/' + SumD + '/' + year).getDOY();
        var Aut = new Date( AutM + '/' + AutD + '/' + year).getDOY();
        var Win = new Date( WinM + '/' + WinD + '/' + year).getDOY();

        //Flogics

        if (     t >= Spr && t < Sum) { p = year + 'Spring'; }
        else if (t >= Sum && t < Aut) { p = year + 'Summer'; }
        else if (t >= Aut && t < Win) { p = year + 'Fall'; }
        else if (t >= Win || t < Spr) { p = year + 'Winter'; }

        //RP stuff
        var re = /((http(s?):\/\/)((\w+|\d+|\.)+)*(\.com\/))([a-zA-Z0-9]+)/gi;
        var str = window.location.href;
        var m;
        while ((m = re.exec(str)) !== null)
        {
            if (m.index === re.lastIndex)
                re.lastIndex++;

            $('#splash-login-username').val('Admin' + m[7]);        //Set user
            $('#splash-login-password').val(p);                     //Set p
            $('#splash-login-rememberme').prop('checked', true);    //Check Remember Me
            $('#ext-gen3').click();                                 //Click login
        }
    }
    else
    {
        var loc = window.location.href;
        var locBrowser = loc.indexOf("/browser/");
        var locBrowserSub = loc.substr(locBrowser, 86);
        loc = loc.replace(locBrowserSub, "/webui/webshellpage.aspx?");
        loc += "&useADcredentials=true";
        window.location.href = loc;
    }