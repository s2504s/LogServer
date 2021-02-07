//firefox - 0
//chrome - 1
window.options = {
    browser : 1,
    version : "3.6.4",
    version_sure : "3.6.4.40",
    intClass : 0,
    lsDomain : localStorage.getItem("lsDomain") ? localStorage.getItem("lsDomain") : "net",
    lsLang : localStorage.getItem("lsLang") ? localStorage.getItem("lsLang") : "en",
    playerId : 0,
    playerName : 0,
    universe : 0,
    domain : 0,    
    gets : ["logserverContent", "logserverContentSpy", "logserverContentAll", "logserverContentSpyAll", "logserverContentExp"],
    ls_ratio_m : localStorage.getItem("ls_ratio_m") ? localStorage.getItem("ls_ratio_m") : 1,
    ls_ratio_c : localStorage.getItem("ls_ratio_c") ? localStorage.getItem("ls_ratio_c") : 1,
    ls_ratio_d : localStorage.getItem("ls_ratio_d") ? localStorage.getItem("ls_ratio_d") : 1,
    arrProcessColor : localStorage.getItem("lsColor") && localStorage.getItem("lsColor").length == 12  ? localStorage.getItem("lsColor") : ["#fff", "#837e78", "#61dd04", "#5566ff", "#910021", "#36a4a7", "#503a2e", "#000000", "#21f3fe", "#c001bc", "#fdab31", "#080d3b"],       
    strProcessColor : '',
};

window.arrLang = {
    "en" : {
        "LogServer_plugin" : "LogServer." + options.lsDomain + " plugin",
        "upload_form" : "upload form",
        "debris_att" : "Attacker debris",
        "debris_def" : "Defense debris",
        "Recycler_report" : "Recycler report:",
        "Comment" : "Comment:",
        "Planet_clean_up" : "Planet clean-up:",
        "Public_log" : "Public log",
        "Hide_coordinates" : "Hide coordinates",
        "Hide_technologies" : "Hide technologies",
        "Hide_time" : "Hide Time",
        "Hide_Comments" : "Ban Comments",
        "Calculate_IPMs" : "Calculate IPMs:",
        "Calc_deuterium" : "Calc. deuterium consumption",
        "Universe" : "Universe",
        "Upload" : "Upload",

        "LS_title" : "LogServer.net GM " + options.version + " script",
        "LS_login" : "Login",
        "LS_logout" : "Logout",
        "LS_pass" : "Password",
        "LS_reg" : "Registration",
        "LS_f_p" : "Forgot Password?",
        "LS_sett" : "Settings",
        "LS_lang" : "Language",
        "LS_server" : "Server",
        "LS_save" : "Save",
        "LS_wl_ow_p" : "Wrong login or password!",
        "LS_not_l" : "Not Login!",
        "LS_not_p" : "Not Password!",

        "my_battles" : "My Battles",       
        "spy_report" : "Spy Report",
        "alliance_battles" : "Alliance Battles",
        "alliance_spy" : "Alliance Spy",
        "discord" : "Discord",
        "menu_exp" : "Exp",

        "lang_table_date" : "Date",
        "lang_table_title" : "Title",
        "lang_table_losses" : "Losses",
        "lang_table_uni" : "Uni",
        "lang_table_lang" : "Lang",
        "lang_table_public" : "Pub",
        "lang_table_del" : "Del",
        "lang_table_edit" : "Edit",

        "lang_table_moon" : "M",
        "lang_table_core" : "Core",
        "lang_table_name" : "Name P/M",
        "lang_table_player" : "Player",
        "lang_table_resurs" : "Resurs",
        "lang_table_fleet" : "Fleet",
        "lang_table_actions" : "Actions",

        "event" : "Event",
        "day" : "Day",
        "week" : "Week",
        "all" : "All",
        "resurs" : "resurs",                
        "fleet" : "fleet",        
        "derbis" : "derbis",

        "exp_table_err" : "Error",        
        "exp_table_empty" : "Empty",        
        "exp_table_found_res" : "Resources found",        
        "exp_table_found_fleet" : "Fleet found",        
        "exp_table_pirates" : "Pirates/Aliens",        
        "exp_table_boost" : "Boost",        
        "exp_table_slowdown" : "Slowdown",        
        "exp_table_black_hole" : "Black hole",        
        "exp_table_trader" : "Trader",        
        "exp_table_animal" : "Animal",        
        "exp_table_chest" : "Chest",        
        "exp_table_dark_matter" : "Dark matter",
        "dark_matter_m" : "DM",
        "exp_table_profit" : "Profit",
        "exp_table_fuel" : "Fuel",                       
        "exp_table_derbis" : "Derbis",                       
    },
    "ru" : {
        "LogServer_plugin" : "LogServer." + options.lsDomain + " плагин",
        "upload_form" : "форма загрузки",
        "debris_att" : "Обломки Атакера",
        "debris_def" : "Обломки Дефа",
        "Recycler_report" : "Доклад переработчиков:",
        "Comment" : "Комментарий:",
        "Planet_clean_up" : "Зачистка планеты:",
        "Public_log" : "Публичный лог",
        "Hide_coordinates" : "Скрыть координаты",
        "Hide_technologies" : "Скрыть технологии",
        "Hide_time" : "Скрыть время",
        "Hide_Comments" : "Запрет комментариев",
        "Calculate_IPMs" : "Учесть МПР:",
        "Calc_deuterium" : "Рассчитать потр. дейтерия",
        "Universe" : "Вселенная",
        "Upload" : "Загрузить",

        "LS_title" : "Cкрипт LogServer.net GM " + options.version,
        "LS_login" : "Логин",
        "LS_logout" : "Выход",
        "LS_pass" : "Пароль",
        "LS_reg" : "Регистрация",
        "LS_f_p" : "Забыли пароль?",
        "LS_sett" : "Настройки",
        "LS_lang" : "Язык",
        "LS_server" : "Сервер",
        "LS_save" : "Сохранить",
        "LS_wl_ow_p" : "Неправильный логин или пароль!",
        "LS_not_l" : "Введите логин!",
        "LS_not_p" : "Введите пароль!",

        "my_battles" : "Боевые",
        "spy_report" : "Шпионские",
        "alliance_battles" : "Ал боев.",
        "alliance_spy" : "Ал шпион.",
        "discord" : "Дискорд",
        "menu_exp" : "Экспа",

        "lang_table_date" : "Дата",
        "lang_table_title" : "Название",
        "lang_table_losses" : "Потери",
        "lang_table_uni" : "Вселен",
        "lang_table_lang" : "Домен",
        "lang_table_public" : "Публ",
        "lang_table_del" : "Удал",
        "lang_table_edit" : "Редак",

        "lang_table_moon" : "Л",
        "lang_table_core" : "Коор",
        "lang_table_name" : "Назв П/Л",
        "lang_table_player" : "Игрок",
        "lang_table_resurs" : "Ресурсы",
        "lang_table_fleet" : "Флот",
        "lang_table_actions" : "Действия",
        
        "event" : "Событие",
        "day" : "День",
        "week" : "Неделя",
        "all" : "Всего",                
        "resurs" : "ресурсы",                
        "fleet" : "флот",                
        "derbis" : "поле обломков", 

        "exp_table_err" : "Ошибка",        
        "exp_table_empty" : "Пустая",        
        "exp_table_found_res" : "Найдены ресурсы",        
        "exp_table_found_fleet" : "Найден флот",        
        "exp_table_pirates" : "Пираты/чужие",        
        "exp_table_boost" : "Ускорение",        
        "exp_table_slowdown" : "Замедление",        
        "exp_table_black_hole" : "Чёрная дыра",        
        "exp_table_trader" : "Торговец",        
        "exp_table_animal" : "Зверушка",        
        "exp_table_chest" : "Предмет",        
        "exp_table_dark_matter" : "Тёмная Материя",
        "dark_matter_m" : "ТМ",
        "exp_table_profit" : "Прибыль",                       
        "exp_table_fuel" : "Топливо",                       
        "exp_table_derbis" : "Обломки",                             
    }
};

window.arrProcessKey = [
    arrLang[options.lsLang]["exp_table_err"], 
    arrLang[options.lsLang]["exp_table_empty"], 
    arrLang[options.lsLang]["exp_table_found_res"], 
    arrLang[options.lsLang]["exp_table_found_fleet"], 
    arrLang[options.lsLang]["exp_table_pirates"], 
    arrLang[options.lsLang]["exp_table_boost"], 
    arrLang[options.lsLang]["exp_table_slowdown"], 
    arrLang[options.lsLang]["exp_table_black_hole"], 
    arrLang[options.lsLang]["exp_table_trader"], 
    arrLang[options.lsLang]["exp_table_animal"], 
    arrLang[options.lsLang]["exp_table_chest"], 
    arrLang[options.lsLang]["exp_table_dark_matter"]
];
window.arrProcessKey[21] = arrLang[options.lsLang]["derbis"];