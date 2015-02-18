'use strict';

var connectSessionSequelize = require('connect-session-sequelize');

module.exports = function() {

	this.config(function($serverProvider, $configProvider) {

		var dbServiceName = $configProvider.get('session.$db');


		if(!dbServiceName) {
			throw new Error('Missing $db attribute in \'session\' config');
		}

		$serverProvider
			.sessionStore(function(sessionMiddleware, $db) {
				var SequelizeStore = connectSessionSequelize(sessionMiddleware.Store);

				var store = new SequelizeStore({
					db: $db[dbServiceName]
				});

				store.sync();

				return store;
			});
	});

};
