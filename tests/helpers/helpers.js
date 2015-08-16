'use strict';

function getModuleProviders (angularModule) {
    var providers = angularModule._invokeQueue,
        arrangedProviders = {
            'constant': [],
            'service': [],
            'register': []
        };
    for (var i = providers.length - 1; i >= 0 ; i--) {
        var type = providers[i][1];
        var provider = providers[i][2][0];
        arrangedProviders[type].push(provider);
    }
    return arrangedProviders;
}