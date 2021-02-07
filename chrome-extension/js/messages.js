if (options.browser == 1)
    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      	if (msg.action == 'ajax') {
            messages(msg);
      	}
    });

if (options.browser == 0)
    browser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'ajax') {
            messages(msg);
        }
    });

    function messages(msg) {
        var intervalCR = 0, 
            intervalSR = 0, 
            intervalRR = 0, 
            intervalEXP = 0,
            urlTab = getUrlVars(msg.data.url).tab;

            //потребление топлива
            if (/page=ingame&component=fleetdispatch&action=checkTarget&ajax=1&asJson=1/.test(msg.data.url)) {
                var fuelCons = $("#consumption span").text().split(' ')[0].replace(/[^-0-9]/gim, '');
                localStorage.setItem("fuel_cons", fuelCons);
            }
            //боевые
            if (urlTab == 21 || urlTab == 12) {
                msg = "#" + $(".subtabs").find("li").eq(1).attr("aria-controls") + " .msg";
                $(msg).removeClass("upload_div");
                intervalCR = window.setInterval(function(thisObj) {
                    if (!document.getElementsByClassName("upload_div")[0]) {
                        $(msg).each(function(i, elem) {
                            $(elem).addClass("upload_div");
                            if (/cr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
                                var pirates = /16/.test($(elem).find(".msg_title").find("a").text().split(':')[2]);
                                if (pirates) {
                                    var msg_action_link = $(elem).find(".msg_action_link").attr("href");
                                    var msg_id = $(elem).attr("data-msg-id");
                                    if (msg_action_link) {
                                        if (!localStorage.getItem(msg_id)) {
                                            $.ajax({
                                                url: msg_action_link,
                                                success: function(data) {
                                                    var textData = $(data).find("script").filter(":first").text();
                                                    var from = textData.search(/\(/) + 2; 
                                                    var to = textData.search(/\);/) - 1;
                                                    var jsonData = textData.substring(from, to);
                                                    sendCrossOrigin(
                                                        'https://logserver.' + options.lsDomain  + '/api/exp.php?act=pirates', 
                                                        'v=' + options.version 
                                                            + '&msg_id='    + msg_id
                                                            + '&player_id=' + options.playerId 
                                                            + '&universe='  + options.universe 
                                                            + '&domain='    + options.domain  
                                                            + '&date='      + $(elem).find(".msg_date").text()
                                                            + '&content='   + jsonData
                                                            + '&class='     + options.intClass 
                                                            + '&id='        + localStorage.getItem('lsId'),
                                                        function() {
                                                            localStorage.setItem(msg_id, "4");
                                                        }
                                                    );
                                                }
                                            });
                                        }                                   
                                        $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");
                                        $(elem).find(".msg_status").addClass("process4");
                                    }
                                }                        
                                var strCode = /cr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
                                var idCode = 'logserver_' + strCode + '_combat';

                                var arr = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];

                                var style =  (arr.indexOf(strCode) != -1) ? "icon_logserver_cr_sl" : "icon_logserver_cr";
                                if (!pirates) $(elem).find(".msg_actions").filter(":first").append("<span id='save_" + idCode + "' class='icon_nf_logserver " + style + " tooltip' code='" + strCode + "'></span>");

                                $(elem).find(".msg_actions").filter(":first").append("<span id='get_form_" + strCode + "' code='" + strCode + "' class='icon_nf_logserver icon_logserver tooltip'></span>");
                                $(elem).append("<div id='" + idCode + "' style='display:none'></div>");

                                $("#get_form_" + strCode).on("click", function() {
                                    var code = $(this).attr("code");
                                    var idCode = 'logserver_' + code + '_combat';
                                    $("#" + idCode).show();
                                    $("#" + idCode).html(ShowCombatreport (strCode, idCode));

                                    $("table#inputs_" + strCode + "recycler img.recycler_textarea_add").on("click", function() {
                                        $("table#inputs_" + strCode + "recycler").append("<tr><td><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>");
                                    });

                                    $("table#clean_up_textarea_" + strCode + " img.clean_up_textarea_add").on("click", function() {
                                        $("table#clean_up_textarea_" + strCode).append("<tr class='clean_up_textarea'><td><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>");
                                    });

                                    $("table#inputs_" + strCode + "recycler img.recycler_textarea_close").on("click", function() {
                                        $("tr#tr_recycler_textarea_" + $(this).attr("idCode")).html("");
                                    });

                                    $("table#clean_up_textarea_" + strCode + " img.clean_up_textarea_close").on("click", function() {
                                        $("tr#tr_clean_up_" + $(this).attr("idCode")).html("");
                                    });

                                    $("#send_" + idCode).on("click", function() {
                                        var btn = $(this);
                                        var idCode = btn.attr("idform");
                                        btn.val("loading");

                                        sendCrossOrigin(
                                            'https://logserver.' + options.lsDomain  + '/index.php',
                                            $("form." + idCode).serialize(),
                                            function(response) {
                                                if (response) var result = jQuery.parseJSON(response.trim());
                                                $(".btn_" + idCode).html("<table>");
                                                $(".btn_" + idCode).append("<tr>");
                                                $(".btn_" + idCode).append("<td style='text-align: left'><input value='" + result["url"] + "' onclick='this.select();' style='width: 500px; text-align: left; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'></td>");
                                                $(".btn_" + idCode).append("<td><input value='>>' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='window.open(\"" + result["url"] + "\");'></td>");
                                                $(".btn_" + idCode).append("</tr>");
                                                if (result["bbcode"]) $(".btn_" + idCode).append("<tr>");
                                                if (result["bbcode"]) $(".btn_" + idCode).append("<td><input id='bbcode_" + idCode + "' value='" + result["bbcode"] + "' onclick='this.select();' style='width: 500px; text-align: left; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'></td>");
                                                if (result["bbcode"]) $(".btn_" + idCode).append("<td><input value='Copy' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='document.getElementById(\"bbcode_" + idCode + "\").select(); document.execCommand(\"copy\");'></td>");
                                                if (result["bbcode"]) $(".btn_" + idCode).append("</tr>");
                                                $(".btn_" + idCode).append("</table>");
                                            }
                                        );
                                        var arr = [];
                                        localStorage.setItem("cr_code", arr);
                                        localStorage.setItem("rr_code", arr);
                                    });                                
                                });

                                $("#save_" + idCode).on("click", function() {
                                    var arr = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];
                                    var code = $(this).attr("code");

                                    if ($(this).is(".icon_logserver_cr")) {
                                        $(this).addClass("icon_logserver_cr_sl");
                                        $(this).removeClass("icon_logserver_cr");
                                        if (arr.indexOf(code) == -1) { 
                                            arr.push(code);
                                            localStorage.setItem("cr_code", arr);
                                        }                                    
                                    } else {
                                        $(this).addClass("icon_logserver_cr");
                                        $(this).removeClass("icon_logserver_cr_sl");
                                        arr = jQuery.grep(arr, function(v) {
                                          return v != code;
                                        });                                                                        
                                        localStorage.setItem("cr_code", arr);
                                    }
                                });
                            } 
                        });
                    } else window.clearInterval(intervalCR);
                }, 500, this);
            }
            //шпионаж
            if (urlTab == 20 || urlTab == 11) {
                msg = "#" + $(".subtabs").find("li").eq(0).attr("aria-controls") + " .msg";
                $(msg).removeClass("upload_msg_div");
                intervalSR = window.setInterval(function(thisObj) {
                    if (!document.getElementsByClassName("upload_msg_div")[0]) {
                        $(msg).each(function(i, elem) {
                            $(elem).addClass("upload_msg_div");
                            if (/sr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
                                var strCode = /sr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
                                var idCode = 'logserver_' + strCode + '_combat';

                                $(elem).find(".msg_actions").filter(":first").append("<span id='send_" + idCode + "' class='icon_nf_logserver icon_logserver tooltip' title='" + arrLang[options.lsLang]["LogServer_plugin"] + "' idform='" + idCode + "'></span>");
                                $(elem).append("<div id='" + idCode + "' style='display:none'>" + ShowMSGreport (strCode, idCode) + "</div>");

                                $(".icon_logserver_sr").on("click", function() {

                                });

                                $("#send_" + idCode).on("click", function() {
                                    var btn = $(this);
                                    var idCode = btn.attr("idform");
                                    $("#" + idCode).show();

                                    sendCrossOrigin(
                                        'https://logserver.' + options.lsDomain  + '/index.php',
                                        $("form." + idCode).serialize(),
                                        function(response) {
                                            if (response) var result = jQuery.parseJSON(response.trim());
                                            $(".btn_" + idCode).html("<input value='" + result["url"] + "' onclick='this.select();' style='width: 500px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'> <input value='>>' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='window.open(\"" + result["url"] + "\");'>");
                                            if (result["bbcode"]) $(".btn_" + idCode).append("<br><input value='" + result["bbcode"] + "' onclick='this.select();' style='width: 500px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'>");
                                        }
                                    );
                                });
                            }
                        });
                    } else window.clearInterval(intervalSR);
                }, 500, this);
            }
            //прочее
            if (urlTab == 24) {
                msg = "#" + $(".subtabs").find("li").eq(4).attr("aria-controls") + " .msg";        
                $(msg).removeClass("upload_rr_div");
                intervalRR = window.setInterval(function(thisObj) {
                    if (!document.getElementsByClassName("upload_rr_div")[0]) {
                        $(msg).each(function(i, elem) {
                            $(elem).addClass("upload_rr_div");
                            if (/rr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
                                var strCode = /rr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
                                var idCode = 'logserver_' + strCode + '_combat';

                                var arr = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];

                                var style = (arr.indexOf(strCode) != -1) ? "icon_logserver_rr_sl" : "icon_logserver_rr";
                                $(elem).find(".msg_actions").filter(":first").append("<span id='save_" + idCode + "' class='icon_nf_logserver " + style + " tooltip' code='" + strCode + "'></span>");
                                
                                var msg_id = $(elem).attr("data-msg-id");
                                if (getUrlVars($(elem).find(".msg_content").find("a").attr("href")).position == 16) {
                                    if (!localStorage.getItem(msg_id)) {
                                        sendCrossOrigin(
                                            'https://logserver.' + options.lsDomain  + '/api/exp.php?act=debris',
                                            'v=' + options.version 
                                                + '&msg_id='    + msg_id
                                                + '&player_id=' + options.playerId 
                                                + '&universe='  + options.universe 
                                                + '&domain='    + options.domain  
                                                + '&date='      + $(elem).find(".msg_date").text()
                                                + '&content='   + strCode
                                                + '&class='     + options.intClass 
                                                + '&id='        + localStorage.getItem('lsId'),
                                            function(response) {
                                                localStorage.setItem(msg_id, "21");
                                                $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");
                                            }
                                        );
                                    } else {
                                        $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");                                    
                                    }
                                }

                                $("#save_" + idCode).on("click", function() {
                                    var arr = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];
                                    var code = $(this).attr("code");

                                    if ($(this).is(".icon_logserver_rr")) {
                                        $(this).addClass("icon_logserver_rr_sl");
                                        $(this).removeClass("icon_logserver_rr");
                                        if (arr.indexOf(code) == -1) { 
                                            arr.push(code);
                                            localStorage.setItem("rr_code", arr);
                                        }                                    
                                    } else {
                                        $(this).addClass("icon_logserver_rr");
                                        $(this).removeClass("icon_logserver_rr_sl");
                                        arr = jQuery.grep(arr, function(v) {
                                          return v != code;
                                        });                                                                        
                                        localStorage.setItem("rr_code", arr);
                                    }
                                });
                            }
                        });
                    } else window.clearInterval(intervalRR);
                }, 500, this);
            }
            //экспы
            if (urlTab == 22) {
                msg = "#" + $(".subtabs").find("li").eq(2).attr("aria-controls") + " .msg";        
                $(msg).removeClass("upload_exp_div");
                if (!localStorage.getItem("ls_exp") || localStorage.getItem("ls_exp") == "null")
                    intervalEXP = window.setInterval(function(thisObj) {
                        if (!document.getElementsByClassName("upload_exp_div")[0]) {
                            $(msg).each(function(i, elem) {
                                $(elem).addClass("upload_exp_div");
                                var msg_id = $(elem).attr("data-msg-id");
                                var time = parseDate($(elem).find(".msg_date").text());
                                if (!localStorage.getItem(msg_id) || localStorage.getItem(msg_id) == 0) {
                                    var arrprocess = (localStorage.getItem("arr_process")) ? localStorage.getItem("arr_process") : [[msg_id, time]];
                                    if (typeof arrprocess == "string") arrprocess = arrprocess.split(",");
                                    let search = false;
                                    $(arrprocess).each(function(i, elem) {
                                        if (elem[0].indexOf(msg_id) != -1) {
                                            search = true;
                                            return false;
                                        }
                                    });
                                    if (!search) arrprocess.push([msg_id, time]);
                                    localStorage.setItem("arr_process", arrprocess);
                                    sendCrossOrigin(
                                        'https://logserver.' + options.lsDomain    + '/api/exp.php?act=save',
                                        'v=' + options.version 
                                            + '&msg_id='    + msg_id
                                            + '&player_id=' + options.playerId 
                                            + '&universe='  + options.universe 
                                            + '&domain='    + options.domain  
                                            + '&date='      + $(elem).find(".msg_date").text()
                                            + '&title='     + $(elem).find(".msg_title").text()
                                            + '&content='   + $(elem).find(".msg_content").text()
                                            + '&sendFleet=' + (localStorage.getItem("fleet_" + time) ? localStorage.getItem("fleet_" + time)[0] : "")
                                            + '&fromСore='  + (localStorage.getItem("fleet_" + time) ? localStorage.getItem("fleet_" + time)[1] : "")
                                            + '&toСore='    + (localStorage.getItem("fleet_" + time) ? localStorage.getItem("fleet_" + time)[2] : "")
                                            + '&fuel='      + (localStorage.getItem("fleet_" + time) ? localStorage.getItem("fleet_" + time)[3] : "")
                                            + '&class='     + options.intClass 
                                            + '&id='        + localStorage.getItem('lsId'),
                                        function(response) {
                                            console.log(response)
                                            console.log(msg_id)
                                            if (response) var result = jQuery.parseJSON(response.trim());
                                            if (result["err"]) {
                                                $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_err tooltip'></span>");                                            
                                            } else {
                                                if (result["result"] == "save") {
                                                    var icon_logserver_exp = (result["process"] == 0) ? "icon_logserver_exp_err" : "icon_logserver_exp";
                                                    var title_result = (result["process"] == 0) ? "Ошибка" : "Результат сохранен";
                                                    localStorage.setItem(msg_id, result["process"]);                                          
                                                    $(elem).find(".msg_actions").filter(":first").append("<span class='tooltip tooltipClose icon_nf_logserver " + icon_logserver_exp + " tooltip' title='" + title_result + "<br>" + arrProcessKey[result["process"]] + "<br><br><a href=\"javascript:void(0)\" data-msg-id=\"" + msg_id + "\" class=\"expErrLink\">Сообщить о ошибке</a>'></span>");
                                                    $(elem).find(".msg_status").addClass("process" + result["process"]);
                                                    if (result["process"] == 0 && !localStorage.getItem("report_" + msg_id)) {
                                                        $(elem).find(".msg_actions").filter(":first").append(expErrList(msg_id));
                                                    } else {
                                                        var arrprocess = (localStorage.getItem("arr_process")) ? localStorage.getItem("arr_process") : [[msg_id, time]];
                                                        if (typeof arrprocess == "string") arrprocess = arrprocess.split(",");
                                                        var search = false;
                                                        $(arrprocess).each(function(i, elem) {
                                                            if (elem[0].indexOf(msg_id) != -1) {
                                                                search = true;
                                                                return false;
                                                            }
                                                        });
                                                        if (!search) arrprocess.push([msg_id, time]);
                                                        localStorage.setItem("arr_process", arrprocess);                                                                                                      
                                                    }
                                                }
                                            }
                                        }
                                    );
                                } else {
                                    var icon_logserver_exp = (localStorage.getItem(msg_id) == 0) ? "icon_logserver_exp_err" : "icon_logserver_exp";
                                    $(elem).find(".msg_status").addClass("process" + localStorage.getItem(msg_id));
                                    $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver " + icon_logserver_exp + " tooltip'></span>");
                                    if (localStorage.getItem(msg_id) == 0 && !localStorage.getItem("report_" + msg_id))                                                           
                                        $(elem).find(".msg_actions").filter(":first").append(expErrList(msg_id));
                                }
                            });
                        } else window.clearInterval(intervalEXP);
            }, 500, this);
        }
    }

function expErrList(msg_id) {
    var html = "";
        html += "<span>";
        html += "<select class='expErrList' data-msg-id='" + msg_id + "' size='1' style='visibility: visible; height: 26px; position: relative; top: -9px; left: 8px;'>";
    $.each(arrProcessKey, function (index, value) {
        if (index < 12)
            html += "<option value='" + index + "'>" + value + "</option>";
    });
        html += "</select>";
        html += "</span>";

    return html;
}