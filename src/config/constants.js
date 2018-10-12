const devConfig = { MONGO_URL: 'mongodb://localhost:27017/caremanagerapi-dev', }; 
 const testConfig = { MONGO_URL: 'mongodb://localhost:27017/caremanagerapi-test', }; 
 const prodConfig = { MONGO_URL: 'mongodb://localhost:27017/caremanagerapi-prod', };
 

const defaultConfig = {
PORT: process.env.PORT || 3003,
};

function envConfig(env) {
    switch (env) {
        case 'prod':
            return prodConfig;
        case 'test':
            return testConfig;
            
        default:
            return devConfig;
    }
}
module.exports =  { ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};

module.exports.secret = "caremanager";

