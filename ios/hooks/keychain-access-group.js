'use strict';
 
exports.id = 'ti.touchid';
exports.cliVersion = '>=3.2';
 
exports.init = function init(logger, config, cli, appc) {
	cli.on('build.ios.writeEntitlements', {
		pre: function (data, finished) {        
			// The team-id-prefix will be generated by the CLI on device builds,
			// getting the team-id from the provisioning profile. 
			if (cli.argv.target !== 'simulator') {
				finished();
				return;
			}
            
			var applicationIdentifier = '$(AppIdentifierPrefix)' + this.tiapp.id;
			var plist = data.args[0];
 
			Array.isArray(plist['keychain-access-groups']) || (plist['keychain-access-groups'] = []);
			if (!plist['keychain-access-groups'].some(function (id) { return id === applicationIdentifier; })) {
				plist['keychain-access-groups'].push(applicationIdentifier);
			}
 
			finished();
		}
	});
};
