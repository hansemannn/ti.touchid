/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2014 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

var TiTouchId = require('ti.touchid');

var win = Ti.UI.createWindow();
var btn = Ti.UI.createButton({
	title: 'authenticate'
});

// You can set the authentication policy on iOS (biometric or passcode)
if (Ti.Platform.name === 'iPhone OS') {
	TiTouchId.setAuthenticationPolicy(TiTouchId.AUTHENTICATION_POLICY_BIOMETRICS); // or: AUTHENTICATION_POLICY_PASSCODE
}

win.add(btn);
win.open();

btn.addEventListener('click', function(){

	if(!TiTouchId.isSupported()) {
		alert("Touch ID is not supported on this device!");
		return;
	}
	
	TiTouchId.authenticate({
		reason: 'We need your fingerprint to continue.',
		allowableReuseDuration: 30, // iOS 9+, optional, in seconds, only used for lockscreen-unlocks
		fallbackTitle: "Use different auth method?", // iOS 10+, optional
		cancelTitle: "Get me outta here!", // iOS 10+, optional
		callback: function(e) {
			if (!e.success) {
				alert('Error! Message: ' + e.error + '\nCode: ' + e.code);
				switch(e.code) {
					case TiTouchId.ERROR_AUTHENTICATION_FAILED: Ti.API.info('Error code is TiTouchId.ERROR_AUTHENTICATION_FAILED'); break;
					case TiTouchId.ERROR_USER_CANCEL: Ti.API.info('Error code is TiTouchId.ERROR_USER_CANCEL'); break;
					case TiTouchId.ERROR_USER_FALLBACK: Ti.API.info('Error code is TiTouchId.ERROR_USER_FALLBACK'); break;
					case TiTouchId.ERROR_SYSTEM_CANCEL: Ti.API.info('Error code is TiTouchId.ERROR_SYSTEM_CANCEL'); break;
					case TiTouchId.ERROR_PASSCODE_NOT_SET: Ti.API.info('Error code is TiTouchId.ERROR_PASSCODE_NOT_SET'); break;
					case TiTouchId.ERROR_TOUCH_ID_NOT_AVAILABLE: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_NOT_AVAILABLE'); break;
					case TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED'); break;
					case TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_NOT_ENROLLED'); break;
					case TiTouchId.ERROR_APP_CANCELLED: Ti.API.info('Error code is TiTouchId.ERROR_APP_CANCELLED'); break;
					case TiTouchId.ERROR_INVALID_CONTEXT: Ti.API.info('Error code is TiTouchId.ERROR_INVALID_CONTEXT'); break;
					case TiTouchId.ERROR_TOUCH_ID_LOCKOUT: Ti.API.info('Error code is TiTouchId.ERROR_TOUCH_ID_LOCKOUT'); break;
					default: Ti.API.info('Error code is unknown'); break;
				}
			} else {
				// do something useful
				alert('YAY! success');
				// Uncomment the next if you want to force the TouchID dialog to show every time
				// TiTouchId.invalidate();
			}
		}
	});
	
	// When uncommented, it should invalidate (hide) after 5 seconds
	setTimeout(function() {
		// TiTouchId.invalidate();
	}, 5000);
});
