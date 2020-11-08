var config = {
	database: {
		host:	  	process.env.DB_HOST,
		user: 	  process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: 	 	process.env.DB_PORT || 3306,
		db: 	  	process.env.DB_SCHEMA || 'test'
	},
	server: {
		port: process.env.PORT || 3000
	}
}

module.exports = config
