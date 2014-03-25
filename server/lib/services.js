ServiceConfiguration.configurations.remove({});
ServiceConfiguration.configurations.insert({
 service: 'facebook',
 appId: process.env.FACEBOOK_APPID,
 secret: process.env.FACEBOOK_SECRET
});