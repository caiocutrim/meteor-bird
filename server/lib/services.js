ServiceConfiguration.configurations.remove({});
ServiceConfiguration.configurations.insert({
 service: Meteor.settings.FB_SERVICE || 'facebook',
 appId: Meteor.settings.FB_APPID || process.env.FACEBOOK_APPID,
 secret: Meteor.settings.FB_SECRET || process.env.FACEBOOK_SECRET,
});