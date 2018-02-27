module.exports = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || 'f^dh@CVis--[P',
  env: process.env.NODE_ENV || 'development',
  db: {
    production: process.env.MONGODB_URI,
    development: 'mongodb://localhost/project-4-development',
    test: 'mongodb://localhost/project-4-test'
  }
};
