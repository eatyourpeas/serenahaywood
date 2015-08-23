if (Meteor.isClient) {
  
  Router.configure({
    layoutTemplate : 'main'
  });

  Router.route('/navigation');
  Router.route('/contact');
  Router.route('/about',{
    name:'about',
    template:'about'
  });
  Router.route('/current_work',{
    name:'current_work',
    template:'current_work'
  });
  Router.route('/writing',{
    name:'writing',
    template:'writing'
  });
  Router.route('/producing',{
    name:'producing',
    template:'producing'
  });
  Router.route('/theatre_companies',{
    name:'theatre_companies',
    template:'theatre_companies'
  });
  Router.route('/future_projects',{
    name:'future_projects',
    template:'future_projects'
  });
  Router.route('/', {
    name: 'home',
    template: 'home'
  });

  Template.navigation.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {

  Meteor.startup(function() {

  WebFontConfig = {
    google: { families: [ 'Roboto Slab:700,400:latin', 'Roboto Mono:300' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

})

}
