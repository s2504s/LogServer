//var browser = "chrome";
var browser = "chrome";
if (browser == "chrome")
	chrome.webRequest.onBeforeRequest.addListener(async message => {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	    	if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, {action: "ajax", data: message}, function(response) {});  
		});
	}, {urls: ['*://*/*']}, ['requestBody']);

if (browser == "firefox")
	browser.webRequest.onBeforeRequest.addListener(function (requestObj) {
		browser.tabs.query({active: true, currentWindow: true}, function(tabs){
	    	browser.runtime.sendMessage(tabs[0].id, {action: "ajax", data: requestObj}, function(response) {});  
		});
	}, {urls: ['*://*/*']}, ['requestBody']);
