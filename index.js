'use strict';

var session = require('express-session');
var SequelizeStore = require('connect-sequelize')(session);
var extend = require('extend');

var defaults = {
	configId: 'session'
};


var configDefaults = {
	resave: false,
	saveUninitialized: true,
	secret: 'asdhlalskdfblaizdvflkahbsdlfkhb'
};



module.exports = function() {

	var that = this;

	if( this._config[defaults.configId] ) {
		var config = extend(true, {}, configDefaults, this._config[defaults.configId]);


		this.config(function(router, inject) {

			if( config.dbService ) {

				return inject([config.dbService, function(db) {
					config.store = new SequelizeStore(db);

					that.logVerbose('Using sessions (SequelizeStore on '+config.dbService+')');
					router.use(session(config));
					return true;
				}]);

			} else {
				that.logVerbose('Using sessions');
				router.use(session(config));
			}



		});

	}

};
