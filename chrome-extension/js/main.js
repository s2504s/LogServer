var strLogServerURL;
var interval = setInterval(function(){
    if ($("#menuTable").length > 0) {
    	clearInterval(interval);
        
        options.playerId = $("meta[name=ogame-player-id]").attr("content").replace(/\D/g, "");
        options.playerName = $("meta[name=ogame-player-name]").attr("content").replace(/\D/g, "");
        options.universe = $("meta[name=ogame-universe]").attr("content").replace(/\D/g, "");
        options.domain = $("meta[name=ogame-language]").attr("content");

        let UvFav = $("#UvFav").length,
            logserverContentLeft = UvFav ? 15 : 44,
            logserverContentSpyLeft = UvFav ? 44 : 73,
            logserverContentExpLeft = UvFav ? 73 : 102;

        let strLogServerURL = "https://logserver." + options.lsDomain + "/index.php";

		let $gameTop = $("#top").length ? $("#top") : $("#info"),
		    $gameContent = $("#middle").length ? $("#middle") : $("#content");

		$gameTop.append (
		      '<div id="logserverContent" get="logserverContent" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
		    + '<div id="logserverContentSpy" get="logserverContentSpy" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
		    + '<div id="logserverContentExp" get="logserverContentExp" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
		);

        $.each(options.arrProcessColor, function (index, value) {
            options.strProcessColor += '.process' + index + ' {background-color: ' + value + ' !important;}';
            options.strProcessColor += '.process' + index + ':before {background-color: ' + value + ' !important; background-image: none !important;}';
        });

        let strClass = $(".characterclass");
        switch (true) {
          case $(strClass).hasClass('miner'):
            options.intClass  = 1;
            break;
          case $(strClass).hasClass('warrior'):
            options.intClass  = 2;
            break;
          case $(strClass).hasClass('explorer'):
            options.intClass  = 3;
            break;
        }

        $("head").append (
            '<style>'
            + '.icon_nf_logserver {background-image: url("https://logserver.net/plugin/images/logserver.png?v=' + options.version_sure + '"); background-repeat: no-repeat; display: inline-block; height: 26px; width: 26px;}'   
            + '.tabs_btn_logserver {background: transparent url("https://logserver.net/plugin/images/ls_butt_3.6.4.gif?v=' + options.version_sure + '") 0 0 no-repeat; background-position-x: 0px; background-position-y: 0px; display: inline; float: left; height: 54px; margin: 0 10px; overflow: visible; position: relative; width: 54px;}'
            + '.lsButtStyle {background: url("https://logserver.net/plugin/images/ls_butt_m.gif?v=' + options.version_sure + '") no-repeat;}'
            + '#logserverContent {position: absolute; top: 103px; left: ' + logserverContentLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -0px 0px;}'
            + '#logserverContent:hover {background-position: -0px -27px;}'
            + '#logserverContentSpy {position: absolute; top: 103px; left: ' + logserverContentSpyLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -27px 0px;}'
            + '#logserverContentSpy:hover {background-position: -27px -27px;}'
            + '#logserverContentExp {position: absolute; top: 103px; left: ' + logserverContentExpLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -162px 0px;}'
            + '#logserverContentExp:hover {background-position: -162px -27px;}'

            + options.strProcessColor    
            + '</style>'
        );

        $("head").append("<link rel='stylesheet' type='text/css' href='" + chrome.runtime.getURL('css/main.css') + "'>");

        $gameContent.after('<div id="lsContent" style="display: none"></div>');

        $("#lsContent").on("click", ".lsButt", function() {
            lsContent($(this).attr("get"));
        });    
        $(".lsButt").on("click", function() {
            lsContentVisible($(this).attr("get"), $(this).attr("lsVis"));
        });

        function lsContentVisible(n, s) {
            $("." + n).is(":visible") ? ($("#" + s).show(), 
                $("#lsContent").hide()) : (lsContent(n), $("#" + s).hide(), 
                $("#lsContent").show())
        }

        function lsContent(id) {
            var html = "";
            if (localStorage.getItem('lsId') && options.gets.indexOf(id) != -1) {
                fStrShow(id, 'https://logserver.' + options.lsDomain + '/api/api.php?act=' + id + '&v=' + options.version + '&id=' + localStorage.getItem('lsId'))
            } else if (id == "logserverOptions") {
                lsContentHTML(id, fStrSettings());
                $("#ls_interval").datepicker({dateFormat: 'yy/mm/dd'});
                $("#ui-datepicker-div").css("background-color", "#111a21");

            } else if (id == "logserverDiscord") {
                lsContentHTML(id, fStrDiscord());
            } else {
                lsContentHTML(id, fStrLogin());       
            }
        }

        function lsContentHTML(id, html) {
            var strShow = "";
                strShow += "<div class='" + id + " lsContent'>";
                strShow +=      lsContentHeader ();
                strShow +=      lsMenu (id);
                strShow += "    <div class='tabContent'>";
                strShow += "        <div class='tabs_wrap'>";
                strShow += "            <div class='tab_ctn'>"; 
                strShow +=                  html;                         
                strShow += "            </div>";           
                strShow += "        </div>";           
                strShow += "    </div>";           
                strShow += "</div>";           
            $("#lsContent").html(strShow);
        }



        function fStrSettings() {
            var ls_lang_selected = [], ls_server_selected = [];

                ls_lang_selected["en"] = (options.lsLang == "en") ? "selected" : "";
                ls_lang_selected["ru"] = (options.lsLang == "ru") ? "selected" : "";

                ls_server_selected["org"] = (options.lsDomain == "org") ? "selected" : "";
                ls_server_selected["net"] = (options.lsDomain == "net") ? "selected" : "";

            var ls_atack_selected_0 = (localStorage.getItem("ls_atack") == "0") ? "selected" : "";
            var ls_atack_selected_1 = (localStorage.getItem("ls_atack") == "1") ? "selected" : "";

            var ls_atack_val_selected_202 = (localStorage.getItem("ls_atack_val") == "202") ? "selected" : "";
            var ls_atack_val_selected_203 = (localStorage.getItem("ls_atack_val") == "203") ? "selected" : "";

            var ls_atack_count = (localStorage.getItem("ls_atack_count")) ? localStorage.getItem("ls_atack_count") : 0;

            var ls_exp = (localStorage.getItem("ls_exp")) ? "checked" : "";
            var ls_exp_pirates = (localStorage.getItem("ls_exp_pirates")) ? "checked" : "";
            var ls_exp_fleet = (localStorage.getItem("ls_exp_fleet")) ? "checked" : "";
            var ls_domain = (localStorage.getItem("logserverContent_" + options.universe + "" + options.domain)) ? "checked" : "";
            var ls_spy_domain = (localStorage.getItem("logserverContentSpy_" + options.universe + "" + options.domain)) ? "checked" : "";
            var ls_interval = (localStorage.getItem("ls_interval")) ? localStorage.getItem("ls_interval") : "";

            var html = "";
                html += "            <table class='lsTable' style='width: 615px;'>";
                html += "                <tr><td></td><td style='width: 120px;'></td></tr>";
                html += "                <tr><td colspan='2' style='text-align: center;'>Общие</td></tr>";
                html += "                <tr><td>" + arrLang[options.lsLang]["LS_server"] + ":</td><td><select id='ls_server' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='net' " + ls_server_selected["net"] + ">LogServer.Net</option><option value='org' " + ls_server_selected["org"] + ">TestServer</option></select></td></tr>";
                html += "                <tr><td>" + arrLang[options.lsLang]["LS_lang"] + ":</td><td><select id='ls_lang' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='en' " + ls_lang_selected["en"] + ">English</option><option value='ru' " + ls_lang_selected["ru"] + ">Русский</option></select></td></tr>";
                html += "                <tr><td></td><td><a id='addLang' class='btn_blue' style='width: 111px;'>Добавить перевод</a></td></tr>";
                //html += "                <tr><td colspan='2' style='text-align: center;'>Боевые</td></tr>";
                //html += "                <tr><td>Отключить привязку к вселенной:</td><td style='text-align: center;'><input id='ls_domain' type='checkbox' style='visibility: visible;' " + ls_domain + "></td></tr>";
                html += "                <tr><td colspan='2' style='text-align: center;'>Шпионские</td></tr>";
                html += "                <tr><td>Отключить привязку к вселенной:</td><td style='text-align: center;'><input id='ls_spy_domain' type='checkbox' style='visibility: visible;' " + ls_spy_domain + "></td></tr>";
                //html += "                <tr><td>&nbsp;</td><td></td></tr>";
                //html += "                <tr><td>Подставлять флот при атаке:</td><td><select id='ls_atack' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='0' " + ls_atack_selected_0 + ">Нет</option><option value='1' " + ls_atack_selected_1 + ">Да</option></select></td></tr>";
                //html += "                <tr><td>Вид транспорт:</td><td><select id='ls_atack_val' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='203' " + ls_atack_val_selected_203 + ">Бт</option><option value='202' " + ls_atack_val_selected_202 + ">Мт</option></select></td></tr>";
                //html += "                <tr><td>Количество:</td><td><input id='ls_atack_count' value='" + ls_atack_count + "' style='visibility: visible; background-color: #B3C3CB; width: 120px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;'></td></tr>";
                
                html += "                <tr><td colspan='2' style='text-align: center;'>Экспа</td></tr>";

                html += "                <tr><td>Соотношения ресов:</td><td style='text-align: center;'>";
                html += "                   <input id='ls_ratio_m ' style='visibility: visible; text-align: center; background-color: #B3C3CB; width: 25px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;' value='" + options.ls_ratio_m  + "'>";
                html += "                   <input id='ls_ratio_c ' style='visibility: visible; text-align: center; background-color: #B3C3CB; width: 25px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;' value='" + options.ls_ratio_c  + "'>";
                html += "                   <input id='ls_ratio_d' style='visibility: visible; text-align: center; background-color: #B3C3CB; width: 25px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;' value='" + options.ls_ratio_d + "'>";
                html += "                </td></tr>";
                html += "                <tr><td>Отключить автоматическую загрузку эксп:</td><td style='text-align: center;'><input id='ls_exp' type='checkbox' style='visibility: visible;' " + ls_exp + "></td></tr>";
                html += "                <tr><td>Отключить автоматическую загрузку боев с пиратами:</td><td style='text-align: center;'><input id='ls_exp_pirates' type='checkbox' style='visibility: visible;' " + ls_exp_pirates + "></td></tr>";
                html += "                <tr><td>Отключить отслеживание флота (подсчет для черных дыр):</td><td style='text-align: center;'><input id='ls_exp_fleet' type='checkbox' style='visibility: visible;' " + ls_exp_fleet + "></td></tr>";
                html += "                <tr><td colspan='2' style='text-align: center;'>&nbsp;</td></tr>";
                html += "                <tr><td>Отображать экспы начиная с даты:</td><td style='text-align: center;'><input id='ls_interval' value='" + ls_interval + "' style='visibility: visible; text-align: center; background-color: #B3C3CB; width: 121px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;'></td></tr>";
                html += "                <tr><td colspan='2' style='text-align: center;'>&nbsp;</td></tr>";
                html += "                <tr><td>Удалить все данные эксп:</td><td style='text-align: center;'><a id='ls_delete_all' class='btn_blue' style='color: red; width: 111px;'>Удалить</a></td></tr>";
                html += "                <tr><td colspan='2' style='text-align: center;'>&nbsp;</td></tr>";
              
                $.each(options.arrProcessColor, function (i, v) {
                    html += "                <tr><td>" + arrProcessKey[i] + ":</td><td style='text-align: center;'><input value='" + v + "' class='lsColor' type='color' style='visibility: visible;'></td></tr>";
                });

                if (localStorage.getItem("test")) {
                    var arrfleet = (localStorage.getItem("arr_fleet")) ? localStorage.getItem("arr_fleet") : [];
                    var arrprocess = (localStorage.getItem("arr_process")) ? localStorage.getItem("arr_process") : [];

                    html += "                <tr><td colspan='2' style='text-align: center;'>Синхронизация времени</td></tr>";
                    html += "                <tr><td>";
                    $.each(arrfleet, function (i, v) {
                        if (v[1]) html += v[1] + "<br>";
                    });        
                    html += "                </td>";
                    html += "                <td>";
                    $.each(arrprocess, function (i, v) {
                        html += v[1] + "<br>";
                    });        
                    html += "                </td></tr>";
                }

                html += "                <tr><td>&nbsp;</td><td></td></tr>";

                html += "                <tr><td></td><td><a class='btn_blue' style='min-width: 110px;' id='ls_save_sett' href='javascript:void(0)'>" + arrLang[options.lsLang]["LS_save"] + "</a></td></tr>";
                html += "            </table>";

            return html;
        }

        $("#lsContent").on("click", "#addLang", function() {
            window.open('https://logserver.' + options.lsDomain + '/index.php?show=lang');
        });

        $("#lsContent").on("click", "#ls_delete_all", function() {
            if (window.confirm("Удалить все логи эксп?")) { 
                sendCrossOrigin(
                    'https://logserver.' + options.lsDomain + '/api/exp.php?act=delete_all',
                    'v=' + options.version
                        + '&player_id=' + options.playerId 
                        + '&universe='  + options.universe 
                        + '&domain='    + options.domain 
                        + '&id='        + localStorage.getItem('lsId'),
                    function(response) {
                        $("#ls_delete_all").text(response);
                        $("#tabs-logserver-exp").click();
                    }
                );
            }
        });

        $("#lsContent").on("click", "#ls_save_sett", function() {
            var lsColor = [];
            $.each($(".lsColor"), function (i, v) {
                lsColor[i] = $(this).val();
            });

            localStorage.setItem("lsColor", lsColor);
            localStorage.setItem("lsLang", $("#ls_lang").val());
            localStorage.setItem("lsDomain", $("#ls_server").val());
            localStorage.setItem("ls_atack", $("#ls_atack").val());
            localStorage.setItem("ls_atack_val", $("#ls_atack_val").val());
            localStorage.setItem("ls_atack_count", $("#ls_atack_count").val());
            localStorage.setItem("ls_exp", $("#ls_exp").prop("checked"));
            localStorage.setItem("ls_exp_pirates", $("#ls_exp_pirates").prop("checked"));
            localStorage.setItem("ls_exp_fleet", $("#ls_exp_fleet").prop("checked"));
            localStorage.setItem("logserverContent_" + options.universe + "" + options.domain, $("#ls_domain").prop("checked"));
            localStorage.setItem("logserverContentSpy_" + options.universe + "" + options.domain, $("#ls_spy_domain").prop("checked"));
            localStorage.setItem("ls_interval", $("#ls_interval").val());

            localStorage.setItem("ls_ratio_m ", $("#ls_ratio_m").val());
            localStorage.setItem("ls_ratio_c ", $("#ls_ratio_c").val());
            localStorage.setItem("ls_ratio_d", $("#ls_ratio_d").val());

            location.reload();
        });

        function fStrDiscord() {
            var html = "";
                html += '            <iframe src="https://discordapp.com/widget?id=780836086150201416&theme=dark" width="617" height="500" allowtransparency="true" frameborder="0"></iframe>';

            return html;
        }

        function fStrShow(act, url) {
            var strShow = "";
                strShow += lsContentHeader ();
                strShow += lsMenu (act);
                strShow += "<div class='tabContent'>";
                strShow += "<div class='tabs_wrap'>";
                strShow += "<div class='tab_ctn'>";
                sendCrossOrigin(
                    url + "&interval=" + localStorage.getItem("ls_interval") + "&universe=" + options.universe + "&domain=" + options.domain + "&player_id=" + options.playerId + "&" + act + "" + "=" + localStorage.getItem(act + "" + options.universe + "" + options.domain),            
                    false,
                    function(response) {
                        if (response) {
                            var varResult = jQuery.parseJSON(response.trim());
                            if (varResult["err"] == "api_not_found") 
                                localStorage.removeItem('lsId');
                            else
                                var varShow = varResult["logs"];
                        }
                        if (act == "logserverContent") {
                            strShow += "    <div class='content'>";
                            strShow += "            <table class='lsTable'>";
                            if (varResult["result"]) {
                                strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                                strShow += "                <thead>";
                                strShow += "                    <tr height='28'>";
                                strShow += "                        <th align='center' width='60'>" + arrLang[options.lsLang]["lang_table_date"] + "</th>";
                                strShow += "                        <th align='center' width='100%'>" + arrLang[options.lsLang]["lang_table_title"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_losses"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_uni"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_lang"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_public"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_del"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_edit"] + "</th>";
                                strShow += "                    </tr>";
                                strShow += "                </thead>";
                                for (var i = 0; i < varShow.length; i++) {
                                    strShow += "                <tr>";
                                    strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
                                    strShow += "                    <td align='left'><a href='" + strLogServerURL + "?id=" + varShow[i]['id'] + "' target='_blank'>" + varShow[i]['title'] + "</a></td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['losses'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['uni'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['domain'] + "</td>";
                                    strShow += "                    <td align='center'><img class='pub' logid='" + varShow[i]['id'] + "' public = '" + varShow[i]['public'] + "' style='cursor:pointer' src='https://logserver.net/index_files/abox/icon_pub_" + varShow[i]['public'] + ".png' width='16' border='0'></td>";
                                    strShow += "                    <td align='center'><span class='del icon_nf icon_refuse js_actionKill tooltip js_hideTipOnMobile' logid='" + varShow[i]['id'] + "'></span></td>";
                                    strShow += "                    <td align='center'><a href='" + strLogServerURL + "?show=edit&log_id=" + varShow[i]['base64'] + "' target='_blank'><span class='icon_nf icon_copy_paste js_actionKill tooltip js_hideTipOnMobile'></span></a></td>";
                                    strShow += "                </tr>";
                                }
                                    strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
                                    strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                            } else {
                                    strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
                            }
                            strShow += "            </table><br><br>";
                            strShow += "        </div>";
                        }
                        if (act == "logserverContentSpy") {
                            strShow += "    <div class='content'>";
                            strShow += "            <table class='lsTable'>";
                            if (varResult["result"]) {
                                strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                                strShow += "                <thead>";
                                strShow += "                    <tr height='28'>";
                                strShow += "                        <th align='center' width='20'>A</th>";
                                strShow += "                        <th align='center' width='60'>" + arrLang[options.lsLang]["lang_table_date"] + "</th>";
                                strShow += "                        <th align='center' width='60'>" + arrLang[options.lsLang]["lang_table_moon"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_core"] + "</th>";
                                strShow += "                        <th align='center' width='100%'>" + arrLang[options.lsLang]["lang_table_name"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_player"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_uni"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_resurs"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_fleet"] + "</th>";
                                strShow += "                        <th align='center' width='0'>" + arrLang[options.lsLang]["lang_table_actions"] + "</th>";
                                strShow += "                    </tr>";
                                strShow += "                </thead>";
                                for (var i = 0; i < varShow.length; i++) {
                                    if (varShow[i]['type'] == 3) var picMoon = "<figure class='planetIcon moon tooltip js_hideTipOnMobile'></figure>";
                                    else var picMoon = "";
                                    strShow += "                <tr>";
                                    strShow += "                    <td align='center'>" + varShow[i]['active'] + "</td>";
                                    strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
                                    strShow += "                    <td align='center'>" + picMoon + "</td>";
                                    strShow += "                    <td align='center'><a href='index.php?page=ingame&component=galaxy&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "'>" + varShow[i]['g'] + ":" + varShow[i]['s'] + ":" + varShow[i]['p'] + "</a></td>";
                                    strShow += "                    <td align='left'><a href='" + strLogServerURL + "?id=" + varShow[i]['id'] + "' target='_blank'>" + varShow[i]['title'] + "</a></td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['player'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['uni'] + "." + varShow[i]['domain'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['loot'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['fleet'] + "</td>";
                                    strShow += "                    <td align='center'>";
                                    strShow += "                        <div style='display:inline-block; width: 110px;'>";
                                    strShow += "                            <span class='icon_nf icon_trashsim tooltip js_hideTipOnMobile tpd-hideOnClickOutside' title=''></span>";
                                    strShow += "                            <span class='del icon_nf icon_refuse  js_actionKill tooltip js_hideTipOnMobile' logid='" + varShow[i]['id'] + "'></span>";
                                    strShow += "                            <a href='#' onclick='sendShipsWithPopup(6," + varShow[i]['g'] + "," + varShow[i]['s'] + "," + varShow[i]['p'] + "," + varShow[i]['type'] + ",0); return false;' class='icon_nf_link_logserver fleft'><span class='icon_nf icon_espionage tooltip js_hideTipOnMobile' title=''></a>";
                                    var ls_atack = (localStorage.getItem("ls_atack") == 1) ? "&am" + localStorage.getItem("ls_atack_val") + "=" + localStorage.getItem("ls_atack_count") : "";
                                    strShow += "                            <a href='index.php?page=ingame&component=fleetdispatch&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "&type=" + varShow[i]['type'] + "&mission=1" + ls_atack + "' class='icon_nf_link_logserver fleft'><span class='icon_nf icon_attack tooltip js_hideTipOnMobile " + varShow[i]['g'] + "" + varShow[i]['s'] + "" + varShow[i]['p'] + "" + varShow[i]['type'] + "' title=''></a>";
                                    strShow += "                        </div>";
                                    strShow += "                    </td>";
                                    strShow += "                </tr>";
                                }
                                    strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
                                    strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                            } else {
                                    strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
                            }
                            strShow += "            </table><br><br>";
                            strShow += "        </div>";
                        }
                        if (act == "logserverContentAll") {
                            strShow += "    <div class='content'>";
                            strShow += "            В разработке.";
                            strShow += "        </div>";
                        }
                        if (act == "logserverContentSpyAll") {
                            strShow += "    <div class='content'>";
                            strShow += "            В разработке.";
                            strShow += "        </div>";
                        }

                        if (act == "logserverContentExp") {
                            var varProcess = varResult["process"];
                            var varProcessDay = varResult["process_day"];
                            var varProcessWeek = varResult["process_week"];
                            var arrProfit = varResult["arrprofit"];
                            if (varResult["fleet"])
                                var arrFleet = jQuery.parseJSON(varResult["fleet"]);

                            strShow += "    <div class='content'>";
                            if (varResult["result"]) {
                                strShow += "    <table class='lsTable' style='width: 615px;'>";
                                strShow += "        <tr><td style='vertical-align: top;'>";
                                strShow += "            <table class='lsTable' style='width: 297px;'>";
                                strShow += "                <thead>";
                                strShow += "                    <tr height='28'>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["event"] + "</th>";
                                strShow += "                        <th align='center' width='50px'>" + arrLang[options.lsLang]["day"] + "</th>";
                                strShow += "                        <th align='center' width='50px'>" + arrLang[options.lsLang]["week"] + "</th>";
                                strShow += "                        <th align='center' width='50px'>" + arrLang[options.lsLang]["all"] + "</th>";
                                strShow += "                    </tr>";
                                strShow += "                </thead>";
                                var imgArrProcessKey = [];
                                var imgarrProcessColor = [];
                                var imgArrProcessCount = [];
                                var y = 0;
                                var varProcessDayAll = 0;
                                var varProcessWeekAll = 0;
                                var varProcessAll = 0;
                                for (var i = 0; i < arrProcessKey.length - 1; i++) {
                                    if (varProcess[i]) {

                                        if (varProcessDay)
                                            varProcessDayAll += (varProcessDay[i] !== undefined) ? varProcessDay[i] : 0;
                                        if (varProcessWeek)
                                            varProcessWeekAll += (varProcessWeek[i] !== undefined) ? varProcessWeek[i] : 0;
                                        
                                        varProcessAll += varProcess[i];

                                        imgArrProcessKey.push(arrProcessKey[Object.keys(varProcess)[y]]);
                                        imgarrProcessColor.push(options.arrProcessColor[i]);
                                        imgArrProcessCount.push(varProcess[i]);
                                        strShow += "                <tr class='process" + Object.keys(varProcess)[y] + "' style='color: #fff;'>";
                                        strShow += "                    <td align='left'>" + arrProcessKey[Object.keys(varProcess)[y]] + "</td>";
                                        strShow += "                    <td align='center'>" + (varProcessDay ? ((varProcessDay[i]) ? varProcessDay[i] : 0) : 0) + "</td>";
                                        strShow += "                    <td align='center'>" + (varProcessWeek ? ((varProcessWeek[i]) ? varProcessWeek[i] : 0) : 0) + "</td>";
                                        strShow += "                    <td align='center'>" + ((varProcess[i]) ? varProcess[i] : 0) + "</td>";
                                        strShow += "                </tr>";
                                        y++;
                                    }
                                }
                                        strShow += "                <tr><td colspan='4'>&nbsp;</td></tr>";

                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["all"] + "</td>";
                                        strShow += "                    <td align='center'>" + varProcessDayAll + "</td>";
                                        strShow += "                    <td align='center'>" + varProcessWeekAll + "</td>";
                                        strShow += "                    <td align='center'>" + varProcessAll + "</td>";
                                        strShow += "                </tr>";

                                        strShow += "                <tr><td colspan='4'>&nbsp;</td></tr>";

                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["exp_table_profit"] + "</td>";
                                        strShow += "                    <td align='center' colspan='3'>" + varResult["profit"] + "</td>";
                                        strShow += "                </tr>";
                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["exp_table_fuel"] + "</td>";
                                        strShow += "                    <td align='center' colspan='3'>" + varResult["fuel"] + "</td>";
                                        strShow += "                </tr>";                                 
                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["lang_table_losses"] + "</td>";
                                        strShow += "                    <td align='center' colspan='3'>" + varResult["losses"] + "</td>";
                                        strShow += "                </tr>";
                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["exp_table_derbis"] + "</td>";
                                        strShow += "                    <td align='center' colspan='3'>" + varResult["derbis"] + "</td>";
                                        strShow += "                </tr>";
                                        strShow += "                <tr>";
                                        strShow += "                    <td align='left'>" + arrLang[options.lsLang]["exp_table_dark_matter"] + "</td>";
                                        strShow += "                    <td align='center' colspan='3'>" + numberPlugin(varResult["dm"], true) + "</td>";
                                        strShow += "                </tr>";                                                                         
                                strShow += "            </table>";
                                strShow += "            </td>";

                                strShow += "            <td>";
                                strShow += "            <table class='lsTable' style='width: 300px; vertical-align: top;'>";
                                strShow += "                <tr>";
                                strShow += "                    <td><iframe src='https://logserver.net/chart/?p=" + imgArrProcessKey.join(",") + "&c=" + imgarrProcessColor.join(",") + "&d=" + imgArrProcessCount.join(",") + "' width='300px' height='300px' scrolling='no'></iframe></td>";
                                strShow += "                </tr>";
                                strShow += "            </table>";
                                strShow += "        </td></tr>";
                                strShow += "    </table><br>";

                                strShow += "<div class='showTable' show='#tableStat' style='width: 615px; height: 28px; background-image: url(//gf3.geo.gfsrv.net/cdne1/d03835718066a5a592a6426736e019.png); color: #848484; text-align: center; cursor:pointer;'><div style='position:relative; top: 6px'>" + arrLang[options.lsLang]["exp_table_found_res"] + "</div></div>";
                                strShow += tableStat(arrProfit);

                                strShow += "<div class='showTable' show='#tableFleet' style='width: 615px; height: 28px; background-image: url(//gf3.geo.gfsrv.net/cdne1/d03835718066a5a592a6426736e019.png); color: #848484; text-align: center; cursor:pointer;'><div style='position:relative; top: 6px'>" + arrLang[options.lsLang]["exp_table_found_fleet"] + "</div></div>";
                                strShow += tableFleet(arrFleet);

                                strShow += "            <table class='lsTable' style='width: 615px;'>";
                                strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                                strShow += "                <thead>";
                                strShow += "                    <tr height='28'>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["lang_table_date"] + "</th>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["lang_table_core"] + "</th>";
                                strShow += "                        <th align='center'>M</th>";
                                strShow += "                        <th align='center'>C</th>";
                                strShow += "                        <th align='center'>D</th>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["exp_table_profit"] + "</th>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["fleet"] + "</th>";
                                strShow += "                        <th align='center'>" + arrLang[options.lsLang]["event"] + "</th>";
                                strShow += "                    </tr>";
                                strShow += "                </thead>";
                                for (var i = 0; i < varShow.length; i++) {
                                    var profit = (varShow[i]['dm'] > 0) ? numberPlugin(varShow[i]['dm'], true) + "ТМ" : varShow[i]['profit'];
                                    var fleet = (varShow[i]['fleet']) ? parseFleet(jQuery.parseJSON(varShow[i]['fleet'])) : "";
                                    strShow += "                <tr>";
                                    strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
                                    strShow += "                    <td align='center'><a href='index.php?page=ingame&component=galaxy&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "'>" + varShow[i]['g'] + ":" + varShow[i]['s'] + ":" + varShow[i]['p'] + "</a></td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['metal'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['crystal'] + "</td>";
                                    strShow += "                    <td align='center'>" + varShow[i]['deuterium'] + "<br>" + varShow[i]['fuel'] + "</td>";
                                    strShow += "                    <td align='center'>" + profit + "</td>";
                                    strShow += "                    <td align='center'>" + fleet + "</td>";
                                    strShow += "                    <td align='center'>" + arrProcessKey[varShow[i]['process']] + "</td>";
                                    strShow += "                </tr>";
                                }
                                strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
                                strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
                                strShow += "            </table><br><br>";

                            } else {
                                strShow += "            <table class='lsTable' style='width: 615px;'>";
                                strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
                                strShow += "            </table><br>";
                            }
                            strShow += "        </div>";
                        }

                        $("#lsContent").html(strShow);

                        $(".firstpage").click((function() {
                            fStrShow(act, 'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&v=' + options.version + '&n=1&id=' + localStorage.getItem('lsId'));
                        }));
                        $(".lastpage").click((function() {
                            fStrShow(act, 'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&v=' + options.version + '&n=' + varResult["pages"] + '&id=' + localStorage.getItem('lsId'));
                        }));
                        $(".backpage").click((function() {
                            if (1 < varResult["page"] && varResult["pages"] >= varResult["page"])
                            fStrShow(act, 'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&v=' + options.version + '&n=' + (parseInt (varResult["page"]) - 1) + '&id=' + localStorage.getItem('lsId'));
                        }));
                        $(".nextpage").click((function() {
                            if (varResult["pages"] > varResult["page"])
                            fStrShow(act, 'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&v=' + options.version + '&n=' + (parseInt (varResult["page"]) + 1) + '&id=' + localStorage.getItem('lsId'));
                        }));
                        $(".pub").click((function() {
                            var vthis = $(this);
                            var logid = $(this).attr("logid");
                            var public = $(this).attr("public");
                            sendCrossOrigin(
                                'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&get=pub&v=' + options.version + '&logid=' + logid + '&public=' + public + '&id=' + localStorage.getItem('lsId'),
                                false,
                                function(response) {
                                    result = response.trim();
                                    if (result) {
                                        vthis.attr("src", "https://logserver.net/index_files/abox/icon_pub_" + result + ".png");
                                        vthis.attr("public", result);
                                    }
                                }
                            );
                        }));
                        $(".del").click((function() {
                            var vthis = $(this);
                            var logid = $(this).attr("logid");
                            if (confirm("Delete?")) {
                                sendCrossOrigin(
                                    'https://logserver.' + options.lsDomain + '/api/api.php?act=' + act + '&get=del&v=' + options.version + '&logid=' + logid + '&id=' + localStorage.getItem('lsId'),
                                    false,
                                    function(response) {
                                        var result = response.trim();
                                        if (result) {
                                            vthis.attr("class", "");
                                        }
                                    }
                                );
                            }
                        }));
                    }
                );
        }

        function lsContentHeader () {
            var html = "";
                html += "<div id='lsHeader'>";
                html += "   <div id='lsTitle'>" + arrLang[options.lsLang]["LogServer_plugin"] + " v." + options.version;
            if (localStorage.getItem('lsId')) html += "<span class='lsLogout'>[" + arrLang[options.lsLang]["LS_logout"] + "]</span>";
                html += "   </div>";
                html += "   <div id='lsMenu'></div>";
                html += "</div>";
                return html;
        }
        function lsMenu (act) {
            var html = "";
                html += "<ul class='tabs_btn ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>";
                html +=      strBtn ("tabs-logserver-bat", arrLang[options.lsLang]["my_battles"], "logserverContent", (act=="logserverContent") ? 1 : 0);
                html +=      strBtn ("tabs-logserver-spy", arrLang[options.lsLang]["spy_report"], "logserverContentSpy", (act=="logserverContentSpy") ? 1 : 0);
                //html +=      strBtn ("tabs-logserver-all-bat", arrLang[options.lsLang]["alliance_battles"], "logserverContentAll", (act=="logserverContentAll") ? 1 : 0);
                //html +=      strBtn ("tabs-logserver-all-spy", arrLang[options.lsLang]["alliance_spy"], "logserverContentSpyAll", (act=="logserverContentSpyAll") ? 1 : 0);
                html +=      strBtn ("tabs-logserver-exp",     arrLang[options.lsLang]["menu_exp"], "logserverContentExp", (act=="logserverContentExp") ? 1 : 0);
                html +=      strBtn ("tabs-logserver-discord", arrLang[options.lsLang]["discord"], "logserverDiscord", (act=="logserverDiscord") ? 1 : 0);
                html +=      strBtn ("tabs-logserver-options", arrLang[options.lsLang]["LS_sett"], "logserverOptions", (act=="logserverOptions") ? 1 : 0);
                html += "</ul>";
                return html;
        }

        $("#lsContent").on("click", ".lsLogout", function() {
            localStorage.removeItem('lsId');
            $(".lsButt").click();
        });

        function fStrLogin () {
            var strLogin = "";

                strLogin += "    <div class='lsLoginTable'>";
                strLogin += "       <form action='login.php'>";
                strLogin += "       <center><table>";
                strLogin += "           <tr><td style='width: 120px;'></td><td style='width: 120px;'></td><td style='width: 120px;'></tr>";
                strLogin += "           <tr class='ls_form'><td style='text-align: left;'>" + arrLang[options.lsLang]["LS_login"] + ":</td><td><input id='ls_l' name='login' tabindex='1' type='text' style='position: inherit; text-align: center; width: 120px; height: 15px;'></td><td style='text-align: right;'><a href='" + strLogServerURL + "?show=registration' target='_blank'>" + arrLang[options.lsLang]["LS_reg"] + "</a></td></tr>";
                strLogin += "           <tr class='ls_form'><td style='text-align: left;'>" + arrLang[options.lsLang]["LS_pass"] + ":</td><td><input id='ls_p' name='password' tabindex='2' type='password' style='position: inherit; text-align: center; width: 120px; height: 15px;'></td><td style='text-align: right;'><a href='" + strLogServerURL + "?show=lostpw' target='_blank'>" + arrLang[options.lsLang]["LS_f_p"] + "</a></td></tr>";
                strLogin += "           <tr class='ls_form'><td>&nbsp;</td><td></td><td></td></tr>";
                strLogin += "           <tr class='ls_form'><td></td><td><input type='submit' class='btn_blue' tabindex='3' style='width: 130px;' id='lsLogin' value='" + arrLang[options.lsLang]["LS_login"] + "'></td><td></td></tr>";
                strLogin += "           <tr class='ls_imgLoad' style='display:none' height='30'><th colspan='3'><img src='https://logserver.net/index_files/ajax-loader.gif'></th></tr>";
                strLogin += "           <tr class='ls_form'><td>&nbsp;</td><td></td><td></td></tr>";
                strLogin += "           <tr class='ls_form lsErrForm' style='display: none'><th colspan='3' class='lsErr'></th></tr>";
                strLogin += "       </table></center>";
                strLogin += "       </form>";
                strLogin += "       </div>";

                return strLogin;
        }

        function lsLoginErr(err) {
            $(".ls_imgLoad").hide();
            $(".ls_form").show();
            $(".lsErrForm").show();
            $(".lsErr").html(err);
        }

        $("#lsContent").on("click", ".showTable", function() {
            ($($(this).attr("show")).is(":visible") == true) ? $($(this).attr("show")).hide() : $($(this).attr("show")).show();
        });

        $("#lsContent").on("click", "#lsLogin", function() {
            event.preventDefault();
            $(".ls_form").hide();
            $(".ls_imgLoad").show();

            if (!$("#ls_l").val()) lsLoginErr(arrLang[options.lsLang]["LS_not_l"])
            else if (!$("#ls_p").val()) lsLoginErr(arrLang[options.lsLang]["LS_not_p"]);
            else {
                sendCrossOrigin(
                    'https://logserver.' + options.lsDomain + '/api/api.php?act=login&v=' + options.version + '&l='+ $("#ls_l").val() +'&p=' + $("#ls_p").val(), 
                    false, 
                    function(response) {
                        if (response) var varResult = jQuery.parseJSON(response.trim());
                        if (varResult) {
                            if (varResult.err == '0') lsLoginErr(arrLang[options.lsLang]["LS_wl_ow_p"]);
                            else if (varResult.err == '-1') lsLoginErr(arrLang[options.lsLang]["LS_not_l"]);
                            else if (varResult.err == '-2') lsLoginErr(arrLang[options.lsLang]["LS_not_p"]);
                            else if (varResult.err == '-999') lsLoginErr('Script version is outdated! Update: <a href="https://logserver.net/plugin/_logserver_gms_combatreport.user.js" target="blank">https://logserver.net/plugin/_logserver_gms_combatreport.user.js</a>.');
                            else {
                                localStorage.setItem('lsId', varResult.id);
                                fStrShow('logserverContent', 'https://logserver.' + options.lsDomain + '/api/api.php?act=logserverContent&v=' + options.version + '&id=' + localStorage.getItem('lsId'));
                            }
                        } else lsLoginErr('Сервер не доступен.<br />Повторите попытку позже.');
                });
            }
        });

        function strBtn (id, name, get, act) {
            active = (act) ? "ui-tabs-active" : "";
            var strBtn = "";
                strBtn += "<li id='" + id + "' class='lsButt' get='" + get + "' lsVis='" + $gameContent.attr("id") + "'>";
                strBtn += "   <a href='javascript:void(0)' class='tabs_btn_logserver tb-" + id + " ui-tabs-anchor " + active + "'>";
                strBtn += "      <span class='new_msg_count' style='display: none;'>0</span> <img src='https://gf2.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif' width='54' height='54'> ";
                strBtn += "      <div class='marker'></div>";
                strBtn += "      <span class='icon_caption'>" + name + "</span> ";
                strBtn += "   </a>";
                strBtn += "</li>";
            return strBtn;
        }

        if (document.location.href.indexOf ("&logserver") > 1) {
            alert ("LogServer.net GM script\nversion: " + options.version);
        }

        if (!localStorage.getItem("ls_exp_fleet")) {
            if (document.location.href.indexOf ("component=fleetdispatch") > 1 || document.location.href.indexOf ("component=movement") > 1) {
                $.ajax({
                    url: '/game/index.php?page=componentOnly&component=eventList&ajax=1',
                    success: function(data) {
                        $(data).find(".eventFleet").each(function(i, elem) {
                            if ($(elem).attr("data-return-flight") == "false" && $(elem).attr("data-mission-type") == "15") {
                                var time = parseInt($(elem).attr("data-arrival-time"));
                                var id = parseInt($(elem).attr("id").replace(/\D+/g,""));
                                var fleet = $($(elem).find(".icon_movement").find("span").attr("title")).text().replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
                                var fromСore = $(elem).find(".coordsOrigin").text().replace(/\r?\n/g, "").replace(/\s+/g, " ").replace(/\[/g, " ").replace(/\]/g, " ").trim();
                                var toСore = $(elem).find(".destCoords").text().replace(/\r?\n/g, "").replace(/\s+/g, " ").replace(/\[/g, " ").replace(/\]/g, " ").trim();

                                var arrfleet = (localStorage.getItem("arr_fleet")) ? localStorage.getItem("arr_fleet") : [[]];
                                var search = false;
                                $(arrfleet).each(function(i, elem) {
                                    if (elem[0] == id || (elem[0] + 1) == id) {
                                        search = true;
                                        return false;
                                    }
                                    if ((elem[0] + 1) == id) {
                                        arrfleet.splice(i, 1);
                                        return false;                                
                                    }
                                });
                                if (!search) arrfleet.push([id, time, fleet, fromСore, toСore, localStorage.getItem("fuel_cons")]);
                                localStorage.setItem("arr_fleet", arrfleet);

                                if (!localStorage.getItem("fleet_" + time)) {
                                    localStorage.setItem("fleet_" + time, [fleet, fromСore, toСore, localStorage.getItem("fuel_cons")]);                            
                                }
                            }
                        });
                    }
                });
                if (localStorage.getItem("arr_fleet") && localStorage.getItem("arr_fleet").count > 1) localStorage.setItem("arr_fleet", localStorage.getItem("arr_fleet").slice(-20));
            }
        }

        function getCoreAtack () {
            $.ajax({
                url: '/game/index.php?page=eventList&ajax=1',
                success: function(data) {
                    $(data).find(".eventFleet").each(function(i, elem) {
                        if ($(elem).attr("data-return-flight") == "false") {
                            if ($(elem).attr("data-mission-type") == "1") {
                                if ($(elem).find(".destFleet").find(".planetIcon.planet").length)   var planetIcon = 1;
                                if ($(elem).find(".destFleet").find(".planetIcon.moon").length)     var planetIcon = 3;
                                var core = $(elem).find(".destCoords").text().replace(/[^-0-9]/gim,'');
                                $("." + core + "" + planetIcon).html("<img src='/cdn/img/layout/fleet_12x12_hostile.gif' class='fright' width='12' height='12' alt='Флот атакует!''>")
                            }
                        }
                    });
                }
            });
        }

        function tableStat(arrProfit) {
            var strShow = "";
                strShow += "            <table id='tableStat' class='lsTable' style='width: 615px; display: none;'>";
                strShow += "                <tr>";
                strShow += "                    <td></td>";
                strShow += "                    <td></td>";
                strShow += "                    <td style='text-align:center'>" + arrLang[options.lsLang]["dark_matter_m"] + "</td>";
                strShow += "                    <td style='text-align:center'>M</td>";
                strShow += "                    <td style='text-align:center'>C</td>";
                strShow += "                    <td style='text-align:center'>D</td>";
                strShow += "                    <td style='text-align:center'>" + arrLang[options.lsLang]["all"] + "</td>";
                strShow += "                </tr>";

                $.each(arrProfit, function (index, value) {
                    var r = 0
                    $.each(value, function (i, v) {
                        (r == 0) ? "<td rowspan='3'>" + index + "</td>" : "";
                        strShow += "                <tr>";
                        strShow +=                      (r == 0) ? "<td rowspan='3' style='text-align:center'>" + arrLang[options.lsLang][index] + "</td>" : "";
                        strShow += "                    <td>" + arrLang[options.lsLang][i] + "</td>";
                        strShow += "                    <td style='text-align:center'>" + numberPlugin((v["dm"]) ? v["dm"] : 0, true) + "</td>";
                        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["metal"]) + "</td>";
                        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["crystal"]) + "</td>";
                        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["deuterium"]) + "</td>";
                        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["metal"] + v["crystal"] + v["deuterium"]) + "</td>";
                        strShow += "                </tr>";
                    r++;
                    });
                });

                strShow += "            </table><br>";

            return strShow;    
        }

        function tableFleet(arrFleet) {
            var dgNameFleet = [];
            var dgValFleet = [];
            var dgValFleetCost = [];
            var intSumCostFleet = {"metal" : 0, "crystal" : 0, "deuterium" : 0, "sum" : 0};
            var local = localStorage.getItem("local_" + options.lsLang) ? localStorage.getItem("local_" + options.lsLang) : localization();
            var strShow = "";
                strShow += "    <table id='tableFleet' class='lsTable' style='width: 615px; display: none;'>";
                strShow += "        <tr>";
                strShow += "            <td style='vertical-align: top;'>";

                strShow += "                <table id='tableFleetQ' class='lsTable tableFleetQ' style='width: 297px; display: none;'>";
                $.each(arrFleet, function (index, value) {
                    if (value > 0) {
                        dgNameFleet.push(local[index]);
                        dgValFleet.push(value);
                        strShow += "                <tr>";
                        strShow += "                    <td>" + local[index] + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(value, true) + "</td>";
                        strShow += "                </tr>";
                    }
                });
                strShow += "                </table>";

                strShow += "                <table id='tableFleetС' class='lsTable tableFleetС' style='width: 297px;'>";
                $.each(arrFleet, function (index, value) {
                    if (value > 0) {
                        let arrCost = costFleet(index);
                        var intCostFleet = (arrCost["m"] / options.ls_ratio_m  + arrCost["c"] / options.ls_ratio_c  + arrCost["d"] / options.ls_ratio_d) * value;
                        intSumCostFleet["metal"] += arrCost["m"] / options.ls_ratio_m  * value;
                        intSumCostFleet["crystal"] += arrCost["c"] / options.ls_ratio_c  * value;
                        intSumCostFleet["deuterium"] += arrCost["d"] / options.ls_ratio_d * value;
                        intSumCostFleet["sum"] += intCostFleet;
                        dgValFleetCost.push(intCostFleet);
                        strShow += "                <tr>";
                        strShow += "                    <td>" + local[index] + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(value, true) + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(arrCost["m"] / options.ls_ratio_m  * value) + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(arrCost["c"] / options.ls_ratio_c  * value) + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(arrCost["d"] / options.ls_ratio_d * value) + "</td>";
                        strShow += "                    <td style='text-align: center;'>" + numberPlugin(intCostFleet) + "</td>";
                        strShow += "                </tr>";
                    }
                });
                    strShow += "                <tr>";
                    strShow += "                    <td></td>";
                    strShow += "                    <td></td>";
                    strShow += "                    <td>" + numberPlugin(intSumCostFleet["metal"]) + "</td>";
                    strShow += "                    <td>" + numberPlugin(intSumCostFleet["crystal"]) + "</td>";
                    strShow += "                    <td>" + numberPlugin(intSumCostFleet["deuterium"]) + "</td>";
                    strShow += "                    <td style='text-align: center;'>" + numberPlugin(intSumCostFleet["sum"]) + "</td>";
                    strShow += "                </tr>";        
                strShow += "                </table>";

                strShow += "            </td>";

                strShow += "            <td>";
                strShow += "                <table class='lsTable tableFleetQ' style='width: 300px; display: none;'>";
                strShow += "                    <tr>";
                strShow += "                        <td><iframe src='https://logserver.net/chart/?p=" + dgNameFleet.join(",") + "&d=" + dgValFleet.join(",") + "' width='300px' height='300px' scrolling='no'></iframe></td>";
                strShow += "                    </tr>";        
                strShow += "                </table>";
                strShow += "                <table class='lsTable tableFleetС' style='width: 300px;'>";
                strShow += "                    <tr>";
                strShow += "                        <td><iframe src='https://logserver.net/chart/?p=" + dgNameFleet.join(",") + "&d=" + dgValFleetCost.join(",") + "' width='300px' height='300px' scrolling='no'></iframe></td>";
                strShow += "                    </tr>";       
                strShow += "                </table>";        
                strShow += "                <div id='changeQC' style='text-align: center; cursor: pointer; position: relative; bottom: 300px;'>Количество <> Стоимость</div>";       
                strShow += "            </td>";
                strShow += "        </tr>";

                strShow += "    </table><br>";

            return strShow;     
        }

        $("body").on("click", "#changeQC", function() {
            (!$(".tableFleetQ:visible").is(":visible")) ? ($(".tableFleetС").hide(), $(".tableFleetQ").show())
            :
            ($(".tableFleetС").show(), $(".tableFleetQ").hide())
        });

        function parseFleet(arr) {
            var result = "";
            var arrFleet = [];
                arrFleet[204] = "ли";
                arrFleet[205] = "ти";
                arrFleet[206] = "крыс";
                arrFleet[207] = "линк";
                arrFleet[215] = "линеек";
                arrFleet[211] = "бомб";
                arrFleet[213] = "унич";
                arrFleet[214] = "зс";
                arrFleet[218] = "жнец";
                arrFleet[219] = "перв";
                arrFleet[202] = "мт";
                arrFleet[203] = "бт";
                arrFleet[208] = "колон";
                arrFleet[209] = "раб";
                arrFleet[210] = "шз";
                arrFleet[212] = "сс";
                arrFleet[217] = "гус";
                arrFleet[216] = "тор";

            $.each(arr, function (index, value) {
                result += value + " " + arrFleet[index] + '<br>';
            });

            return result;
        }

        function costFleet(key) {
            var arrFleet = [];
                arrFleet[204] = {m: 3000, c: 1000, d: 0};
                arrFleet[205] = {m: 6000, c: 4000, d: 0};
                arrFleet[206] = {m: 20000, c: 7000, d: 2000};
                arrFleet[207] = {m: 45000, c: 15000, d: 0};
                arrFleet[215] = {m: 30000, c: 40000, d: 15000};
                arrFleet[211] = {m: 50000, c: 25000, d: 15000};
                arrFleet[213] = {m: 60000, c: 50000, d: 15000};
                arrFleet[214] = {m: 5000000, c: 4000000, d: 1000000};
                arrFleet[218] = {m: 85000, c: 55000, d: 20000};
                arrFleet[219] = {m: 8000, c: 15000, d: 8000};
                arrFleet[202] = {m: 2000, c: 2000, d: 0};
                arrFleet[203] = {m: 6000, c: 6000, d: 0};
                arrFleet[208] = {m: 10000, c: 20000, d: 10000};
                arrFleet[209] = {m: 10000, c: 6000, d: 2000};
                arrFleet[210] = {m: 0, c: 1000, d: 0};
                arrFleet[212] = {m: 0, c: 2000, d: 500};
                arrFleet[217] = {m: 2000, c: 2000, d: 1000};

            if (arrFleet[key])
                return arrFleet[key];
        }

        $("body").on("click", ".expErrLink", function() {
            var msg_id = $(this).attr("data-msg-id");
            $("li[data-msg-id='" + msg_id + "']").find(".msg_actions").filter(":first").append(expErrList(msg_id));
        });

        $(".content").on("change", ".expErrList", function() {
            var $select = $(this);
            if (confirm("Send report?")) {
                $select.css("display", "none");
                sendCrossOrigin(
                    'https://logserver.' + options.lsDomain + '/api/exp.php?act=report',
                    'v=' + options.version
                        + '&msg_id=' + $(this).attr("data-msg-id")
                        + '&player_id=' + options.playerId 
                        + '&universe=' + options.universe 
                        + '&domain=' + options.domain 
                        + '&report=' + $(this).find("option:selected").val()
                        + '&id=' + localStorage.getItem('lsId'),                 
                    function(response) {
                        if (response) {
                            var result = jQuery.parseJSON(response.trim());
                            (result["result"] == "save") ? localStorage.setItem("report_" + $select.attr("data-msg-id"), true) : $select.css("display", "");                        
                        }
                    }
                );       
            }
        });

        function numberPlugin(intNumber, s) {
            var strValue;
            var strClass;
            var strMin = "";

            if (intNumber < 0) {
                intNumber = intNumber * -1;
                strMin = "-";
            }

            if (s) return '<font class="abox_text">' + strMin + intNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</font>';

            if (intNumber < 1000) {
                strValue = intNumber;
                strClass = 'abox_text';
            }
            else if (intNumber < 1000000) {
                strValue = (Math.round(intNumber / 1000, 1)) + "K";
                strClass = 'abox_text_yellow';
            }
            else if (intNumber < 1000000000) {
                strValue = (Math.round(intNumber / 1000000, 1)) + "Mn";
                strClass = 'abox_text_green';
            }
            else if (intNumber < 1000000000000) {
                strValue = (Math.round(intNumber / 1000000000, 1)) + "Bn";
                strClass = 'abox_text_red';
            }
            else
                strClass = 'abox_text_red';

            return '<font class="' + strClass + '">' + strMin + strValue + '</font>';
        }

        function localization() {
            var arr = [];
            sendCrossOrigin(
                'https://logserver.' + options.lsDomain + '/api/api.php?act=localization&v=' + options.version,
                'options.lsLang=' + options.lsLang,
                function(response) {
                    var xml = response.trim()
                    $(xml).find("techs").find("name").each(function (index, value) {
                        arr[parseInt($(value).attr("id"))] = $(value).text();
                    });
                    localStorage.setItem("local_" + options.lsLang, arr);
                }
            );

            return arr; 
        }

	
    }
}, 50);


