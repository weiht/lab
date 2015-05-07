require('nw.gui').Window.get().maximize();

var KEY_CONF_URL = 'remoteConfig';

$(function() {
	var configUrl = window.localStorage.getItem(KEY_CONF_URL);
	$('#txtConfUrl').val(configUrl || '');

	if (configUrl) {
		testConfig(configUrl);
	} else {
		showConfig('');
	}
});

function showConfig(msg) {
	$('.modal').modal('hide');
	$('#msg').text(msg && ('读取配置时发生错误 - ' + msg));
	$('.config').show();
}

function hideConfig() {
	$('.config').hide();
	$('.modal').modal();
}

function saveConfig() {
	var url = $('#txtConfUrl').val();
	if (url) {
		testConfig(url);
	}
}

function testConfig(url) {
	hideConfig();
	var conn;
	if (url.indexOf('https://') == 0) {
		conn = require('https');
	} else {
		conn = require('http');
	}
	if (url.indexOf('http') != 0) {
		url = 'http://' + url;
	}
	if (url.charAt(url.length) == '/') {
		url += 'config.json';
	}
	conn.get(url, function(resp) {
		var code = resp.statusCode;
		if (code < 200 || code >= 400) {
			showConfig('访问不到配置文件');
			return;
		}
		resp.on('data', function(json) {
			var conf;
			try {
				conf = JSON.parse(json);
			} catch (e) {
				showConfig("配置文件格式错误（" + e.message + "）");
				return;
			}
			if (conf && conf.homePage) {
				window.localStorage.setItem(KEY_CONF_URL, url);
				location.href = conf.homePage;
			} else {
				showConfig('配置内容错误');
			}
		});
	}, function(e) {
		showConfig('连接服务时发生错误（' + e.message + '）');
	});
}
