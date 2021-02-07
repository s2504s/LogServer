function getUrlVars(r){if(!r)return!1;for(var t,e=[],i=r.slice(r.indexOf("?")+1).split("&"),n=0;n<i.length;n++)e[(t=i[n].split("="))[0]]=t[1];return e}

function parseDate(s) {
    if (!s) return false;
    var p = s.split(' ');
    var d = p[0].split('.');
    var f = p[1].split(':');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    var date = new Date(parseInt(d[2]), parseInt(d[1])-1, parseInt(d[0]), parseInt(f[0]), parseInt(f[1]), parseInt(f[2])).getTime() / 1000 - 1;

    return date;
}

function sendCrossOrigin(url, data, success){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            success(xmlhttp.responseText);
        }
    }
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function ShowCombatreport (strCRCode, idCRCode) {
    var year = new Date().getFullYear() + 1;
    var strUploadDiv = "";
        strUploadDiv += "<form class='" + idCRCode + "' action='false' method='post' target='_blank'>";
        strUploadDiv += "<input type='hidden' name='plugin' value='1'>";
        strUploadDiv += "<input type='hidden' name='plugin_user_key' value='" + localStorage.getItem('lsId') + "'>";
        strUploadDiv += "<center>";
        strUploadDiv += "   <table>";
        strUploadDiv += "       <tr>";
        strUploadDiv += "           <center><font color='#00DD00'><b>LogServer." + options.lsDomain + " " + arrLang[options.lsLang]["upload_form"] + "</b></font></center>";
        strUploadDiv += "       </tr>";
        strUploadDiv += "       <tr>";
        strUploadDiv += "           <td align='center'>";
        strUploadDiv += "               <textarea rows='8' name='log_textarea' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strCRCode +"</textarea>";
        strUploadDiv += "               <input name='rb_rec_report' value='V1' checked type='radio'>" + arrLang[options.lsLang]["debris_att"] + "&nbsp;<input name='rb_rec_report' value='V2' type='radio'>" + arrLang[options.lsLang]["debris_def"] + "";
                                                    var arrRR = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];
                                                    var strChecked = getCookie("cbx_recycler");
                                                    if (strChecked == "false" || arrRR.length > 0) {
                                                        strChecked = "";
                                                        var strDisplay = "";
                                                    }
                                                    else {
                                                        strChecked = "checked";
                                                        strDisplay = "none";
                                                    }
        strUploadDiv += "               <input id=\"cbx_recycler\" name=\"cbx_recycler\" value=\"ON\" " + strChecked + " onclick=\"if(!this.checked){document.getElementById('inputs_" + strCRCode + "_recycler').style.display=''} else {document.getElementById('inputs_" + strCRCode + "_recycler').style.display='none'};\" onchange='document.cookie=\"cbx_recycler=\"+this.checked+\"; expires=Monday, 01-Nov-" + year + " 10:0:0 GMT\"' type=\"checkbox\">Всё поле обломков переработано<br>";

        strUploadDiv += "               <table id=\"inputs_" + strCRCode + "_recycler\" style=\"border-collapse: collapse; display:" + strDisplay + "\">";
        strUploadDiv += "                   <tr><td style='width: 484px;'><font face='Arial' color='#888888' size='2'>" + arrLang[options.lsLang]["Recycler_report"] + "</font></td><td><img class='recycler_textarea_add' src='https://logserver.net/index_files/ico/add.png'></td></tr>";

        if (arrRR.length > 0) arrRR.forEach(function(item, i, arr) {
            strUploadDiv += "                   <tr id='tr_recycler_textarea_" + item + "'><td><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"" + item + "\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td><td><img class='recycler_textarea_close' idCode='" + item + "' src='https://logserver.net/index_files/ico/close.png'></td></tr>";
        });
        else strUploadDiv += "                   <tr><td colspan='2'><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>";
        strUploadDiv += "               </table>";

        strUploadDiv += "               <table id=\"clean_up_textarea_" + strCRCode + "\" style=\"border-collapse: collapse\">";
        strUploadDiv += "                   <tr><td style='width: 484px;'><font face='Arial' color='#888888' size='2'>" + arrLang[options.lsLang]["Planet_clean_up"] + "</font></td><td><img class='clean_up_textarea_add' src='https://logserver.net/index_files/ico/add.png'></td></tr>";
        
        var arrCR = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];
        if (arrCR.length > 0) arrCR.forEach(function(item, i, arr) {
            if (strCRCode != item) strUploadDiv += "                   <tr id='tr_clean_up_" + item + "'><td><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"" + item + "\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td><td><img class='clean_up_textarea_close' idCode='" + item + "' src='https://logserver.net/index_files/ico/close.png'></td></tr>";
        });
        else strUploadDiv += "                   <tr><td colspan='2'><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>";
        strUploadDiv += "               </table>";

        strUploadDiv += "               <table style=\"border-collapse: collapse\">";
        strUploadDiv += "                   <tr><td><font face='Arial' color='#888888' size='2'>" + arrLang[options.lsLang]["Comment"] + "</font></td></tr>";
        strUploadDiv += "                   <tr><td><textarea rows='2' name='comment_textarea' cols='160' style='width: 500px; min-height: 20px; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4);'></textarea></td></tr>";
        strUploadDiv += "               </table>";
        strUploadDiv += "           </td>";
        strUploadDiv += "       </tr>";

                                                    strChecked = getCookie("index_cbx_public");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";
        var strCheckBoxes = "                           <input type='checkbox' name='cbx_public' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_public=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Public_log"] + "</font><br>";
                                                    strChecked = getCookie("index_cbx_hide_coord");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";
        strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_coord' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_hide_coord=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Hide_coordinates"] + "</font><br>";
                                                    strChecked = getCookie("index_hide_tech");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";
        strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_tech' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_tech=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Hide_technologies"] + "</font><br>";
                                                    strChecked = getCookie("index_hide_tech");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";
        strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_time' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_time=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Hide_time"] + "</font><br>";
                                                    strChecked = getCookie("index_hide_comments");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";
        strCheckBoxes += "                          <input type='checkbox' name='cbx_comments' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_comments=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Hide_Comments"] + "</font><input type=hidden name='submited' value='1'>";

        var strListBoxes = "                            <table border='1' style='border-collapse: collapse' cellpadding='2'><tr>";

        strListBoxes += "                                                   <tr height='4'><td></td><td width='4'></td><td></td></tr><tr><td>";
        strListBoxes += "                                                   <select size='1' name='select_skin' style='font-size: 10px; width: 120px; visibility: visible;'>";
        strListBoxes += "                                                       <option value='logserver_v20' selected>Skin: LogServer v2</option>";
        strListBoxes += "                                                       <option value='0'>Default</option>";
        strListBoxes += "                                                       <option value='original'>Original</option>";
        strListBoxes += "                                                       <option value='abstract'>Abstract</option>";
        strListBoxes += "                                                       <option value='animex'>AnimeX</option>";
        strListBoxes += "                                                       <option value='animex_2'>AnimeX 2</option>";
        strListBoxes += "                                                       <option value='chaos'>Chaos</option>";
        strListBoxes += "                                                       <option value='destroyer'>Destroyer</option>";
        strListBoxes += "                                                       <option value='fallout'>Fallout</option>";
        strListBoxes += "                                                       <option value='dead_space'>Dead Space</option>";
        strListBoxes += "                                                       <option value='ntrvr'>?ntrvr[!]</option>";
        strListBoxes += "                                                       <option value='disturbed'>Disturbed</option>";
        strListBoxes += "                                                       <option value='staticx'>Static-X</option>";
        strListBoxes += "                                                       <option value='system_shock'>System shock</option>";
        strListBoxes += "                                                       <option value='bender'>Bender</option>";
        strListBoxes += "                                                   </select>";
        strListBoxes += "                                                   <td></td></td";
        strListBoxes += "                                                   </td></tr></table>";

        strUploadDiv += "       <tr>";
        strUploadDiv += "                                   <td align='left'>";
        strUploadDiv += "                                       <table border='1' style='border-collapse: collapse' >";
        strUploadDiv += "                                           <tr>";
        strUploadDiv += "                                               <td align='left' valign='top'>";
        strUploadDiv +=                                                      strCheckBoxes;
        strUploadDiv += "                                               </td>";
        strUploadDiv += "                                               <td width='10'></td>";
        strUploadDiv += "                                               <td align='right' valign='top'>";
        strUploadDiv += "                                                   <div id='exsettings' style='display: block;'>";
        strUploadDiv += "                                                       <table border='1' style='border-collapse: collapse'>";
        strUploadDiv += "                                                           <tr>";
        strUploadDiv += "                                                               <td>";
        strUploadDiv += "                                                                   <input type='checkbox' name='cbx_ipm' value='ON' onchange='(this.checked) ? (document.getElementById(\"text_ipm\").disabled = false) : (document.getElementById(\"text_ipm\").disabled = true)'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Calculate_IPMs"] + " </font>";
        strUploadDiv += "                                                                   <input disabled type='text' id='text_ipm' name='text_ipm' size='5' value='' style='width: 20; font-size: 12px; font-family: Arial; color: #000000; background-color: #ffffff; border: 1px solid #888888;'>";
        strUploadDiv += "                                                                   <br>";
                                                    strChecked = getCookie("index_hide_fuel");
                                                    if (strChecked == "false") strChecked = ""
                                                    else strChecked = "checked";        
        strUploadDiv += "                                                                   <input type='checkbox' name='cbx_fuel' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_fuel=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[options.lsLang]["Calc_deuterium"] + "<br>(<select size='1' name='select_p_fuel' style='font-size: 10px; visibility: visible;'><option value='1'>100%</option> <option value='0.9'>90%</option> <option value='0.8'>80%</option> <option value='0.7'>70%</option> <option value='0.6'>60%</option> <option value='0.5'>50%</option> <option value='0.4'>40%</option> <option value='0.3'>30%</option> <option value='0.2'>20%</option> <option value='0.1'>10%</option> </select>)</font>";
        strUploadDiv += "                                                               </td>";
        strUploadDiv += "                                                               <td width='10'></td>";
        strUploadDiv += "                                                               <td>";
        strUploadDiv +=                                                                      strListBoxes;
        strUploadDiv += "                                                               </td>";
        strUploadDiv += "                                                           </tr>";
        strUploadDiv += "                                                       </table>";
        strUploadDiv += "                                                   </div>";
        strUploadDiv += "                                               </td>";
        strUploadDiv += "                                           </tr>";
        strUploadDiv += "                                       </table>";
        strUploadDiv += "                                   </td>";
        strUploadDiv += "                               </tr>";

        strUploadDiv += "       <tr>";
        strUploadDiv += "           <td class='btn_" + idCRCode + "' style='text-align:center'>";
        strUploadDiv += "                   <input id='send_" + idCRCode + "' class='btn_blue' idform='" + idCRCode + "' type='button' value='" + arrLang[options.lsLang]["Upload"] + "' name='submit'>";
        strUploadDiv += "           </td>";
        strUploadDiv += "       </tr>";
        strUploadDiv += "   </table>";
        strUploadDiv += "</center>";
        strUploadDiv += "</form>";
        return strUploadDiv;
}

function ShowMSGreport (strSRCode, idSRCode) {
    var strUploadDiv = "";
        strUploadDiv += "<form class='" + idSRCode + "' action='" + strLogServerURL + "' method='post' target='_blank'>";
        strUploadDiv += "<input type='hidden' name='plugin' value='2'>";
        strUploadDiv += "<input type='hidden' name='plugin_user_key' value='" + localStorage.getItem('lsId') + "'>";
        strUploadDiv += "<center>";
        strUploadDiv += "   <table>";
        strUploadDiv += "       <tr>";
        strUploadDiv += "           <center><font color='#00DD00'><b>LogServer." + options.lsDomain + " " + arrLang[options.lsLang]["upload_form"] + "</b></font></center>";
        strUploadDiv += "       </tr>";
        strUploadDiv += "       <tr>";
        strUploadDiv += "           <td align='center'>";
        strUploadDiv += "               <textarea rows='8' name='log_textarea' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strSRCode +"</textarea>";
        strUploadDiv += "               <input type='hidden' name='rb_spy_report' value='V2' checked type='radio'>";
        strUploadDiv += "           </td>";
        strUploadDiv += "       </tr>";

        strUploadDiv += "       <tr>";
        strUploadDiv += "           <td class='btn_" + idSRCode + "' style='text-align:center'>";
        strUploadDiv += "                   <input type=hidden name='submited' value='1'>";
        strUploadDiv += "           </td>";
        strUploadDiv += "       </tr>";
        strUploadDiv += "   </table>";
        strUploadDiv += "</center>";
        strUploadDiv += "</form>";

        return strUploadDiv;
}