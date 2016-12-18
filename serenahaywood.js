PlayList = new Meteor.Collection('plays');
ReviewList = new Meteor.Collection('reviews');

PlayList.insert({
  play_image: '/img/goddess.jpg',
  date: 'August 2015',
  festival_name: 'Camden Fringe',
  title: 'Goddess',
  theatre_company: 'Tangerine Theatre Company',
  web_link: 'http://tangerinetheatre.moonfruit.com/',
  facebook_page: 'https://www.facebook.com/pages/Tangerine-Theatre-Company/355673674622043?ref=bookmarks',
  venue: 'Tristan Bates Theatre',
  venue_web_link: 'http://tristanbatestheatre.co.uk/'
},
{
  play_image : '/img/sarah_cowen_ladylogue.png',
  date: 'August 2015',
  festival_name: 'Camden Fringe',
  title: 'Zero in Ladylogue',
  theatre_company: 'The Thelmas',
  web_link: 'http://www.thethelmas.co.uk/',
  facebook_page: '',
  venue: 'Tristan Bates Theatre',
  venue_web_link: 'http://tristanbatestheatre.co.uk/'
});

ReviewList.insert({
  stars: 4,
  review: "richly-written…Serena Haywood once again proving she is the master of believable and intriguing characters.... laugh-out-loud funny….Haywood’s writing staggers from almost dystopian, poetic descriptions of grey, crumbling Rhyl, to genuinely laugh your socks off, swearing like a sailor genius",
  reviewer: "Female Arts",
  review_link: 'http://femalearts.com/node/1972'
},
{
stars: 3,
review: "infectiously likeable…you definitely won't regret spending time with Holiday",
reviewer: "View From The Gods",
review_link: 'http://www.viewsfromthegods.co.uk/plays.shtml'
},{
  stars: 3,
  review: '..one liners, alongside very powerful and poignant dialogue',
  reviewer: 'Everything Theatre',
  review_link: 'http://everything-theatre.co.uk/2015/08/goddess-tristan-bates-theatre-review.html'
},{
  stars: 3,
  review: '..deep and compelling….yet another example of Haywood’s supreme character writing. You don’t get more excellent character writing than this. Holiday is an unforgettable and deeply empathetic character, like so many of Haywood’s other creations, and is a joy to see realised….An amazing piece of character writing, Goddess leaves a genuine impression',
  reviewer: 'Grumpy Gay Critic',
  review_link: 'http://grumpygaycritic.co.uk/2015/08/camden-fringe-2015-goddess/'
},{
  stars: 5,
  review: '…Haywood pens a viscous sideways comedy that puts the vapid and toxic rhetoric on disability on benefits firmly in its place… Haywood, again working her miracle talent for character writing, has come up with a cooky and breezy satire, that still has its dark and heartfelt turns. Haywood’s character makes you genuinely feel for and connect with them, meaning at the apex of Zero, you’re on the edge of the seat as to what they’ll do next. You’ll definitely laugh, and you’ll certainly gasp too…Zero is a supernova end to Ladylogue!',
  reviewer: 'Grumpy Gay Critic',
  review_link: 'http://grumpygaycritic.co.uk/2015/08/camden-fringe-2015-ladylogue/?utm_content=buffer7070c&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer'
}, {
  stars: 4,
  review: '…thought-provoking play… a deeper understanding that will really tug at your heart-strings',
  reviewer: 'A Younger Theatre',
  review_link : 'http://www.ayoungertheatre.com/review-ladylogue-tristan-bates/'
}, {
  stars: 4,
  review : '...a roaring success',
  reviewer : 'Views from the Gods',
  review_link : 'http://viewsfromthegods.co.uk/ladylogue-2015.shtml'
}, {
  stars: 4,
  review : '',
  reviewer : 'The Camden Fringe',
  review_link : 'http://theatre.revstan.com/2015/08/camdenfringe-review-thethelmas-ladylogue-tristan-bates-theatre.html'
}, {
  stars : 4,
  review : '',
  reviewer : 'Camden Voyeur',
  review_link : 'https://camdenvoyeur.wordpress.com/2015/08/20/review-of-ladylogue-by-the-thelmas-an-evening-of-shorts/'
}, {
  stars : 4,
  review : '',
  reviewer : 'London Theatre',
  review_link : 'https://www.londontheatre1.com/news/113333/review-of-ladylogue-at-tristan-bates-theatre-camden-fringe-2015/'
}, {
  stars : 4,
  review : '... fine writing',
  reviewer : '17%',
  review_link : 'https://17percent.wordpress.com/2015/08/20/review-ladylogue-2015-presented-by-the-thelmas/'
}, {
  stars : 4,
  review : '',
  reviewer : 'There Ought To Be Clowns',
  review_link : 'http://oughttobeclowns.blogspot.co.uk/2015/08/review-ladylogue-tristan-bates.html?m=0'
});


if (Meteor.isServer) {
  Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1}});
  });

  Meteor.publish("plays", function(){
    return PlayList.find();
  });

  Meteor.publish("reviews", function(){
    return ReviewList.find();
  });

  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
  });

  Meteor.methods({
    'removePlayAndRelatedReviews': function(playId){
      ReviewList.remove({playId : playId});
      PlayList.remove(playId);
    },
    'newPlay' : function(newPlay){
      return PlayList.insert(newPlay);
    },
    'updatePlay': function(playId, updatedPlay){
      PlayList.update(playId, updatedPlay);
    },
    'newReview' : function(newReview){
      ReviewList.insert(newReview);
    },
    'updateReview' : function (reviewId, updatedReview){
      ReviewList.update(reviewId, updatedReview);
    },
    'deleteReview' : function (reviewId){
      ReviewList.remove(reviewId);
    }
  });

  Cloudinary.config({
    cloud_name: 'eatyourpeas',
    api_key: '276687718881966',
    api_secret: 'zmH7kn_QMr9uZ8iXafMVmpA-kyA'
  });
}

if (Meteor.isClient) {

  var currentIndex = 0;
  tempFiles = [];

  $.cloudinary.config({
    cloud_name:"eatyourpeas"
  });

  Router.configure({
    waitOn: function(){
      return Meteor.subscribe('userData');
    },
    data : function()
         {
             var params = this.params;
             var user = Meteor.users.findOne({ "services.facebook.username" : this.params.username });
             return user
         },
    layoutTemplate : 'main'

  });

  var MyPlays = Meteor.subscribe("plays");
  var MyReviews = Meteor.subscribe('reviews');


  Router.route('/navigation');

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
  Router.route('/writers_groups',{
    name:'writers_groups',
    template:'writers_groups'
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

  Template.reviewpaneldata.helpers({
    checkIfAdmin: function(){
      if (Meteor.user()) {
        if (Meteor.user().services.facebook.id === '893362070752768' || Meteor.user().services.facebook.id === '100001350527379') {
          return true;
        }
      } else {
       return false;
     }
    },
    'starNumber' : function(){
      var numberOfStars = this.stars;
      var stringToConcat = '';
      for (var i = 0; i < numberOfStars; i++) {
        stringToConcat = stringToConcat.concat('<i class="fa fa-lg fa-star"></i>')
      }
      return stringToConcat;
    }
  });

  Template.paneldata.helpers({
    checkIfAdmin: function(){
      if (Meteor.user()) {
        if (Meteor.user().services.facebook.id === '893362070752768' || Meteor.user().services.facebook.id === '100001350527379') {
          return true;
        }
      } else {
       return false;
     }
    }
  });

  Template.writing.helpers({

      'Plays': function(){
        return PlayList.find();
      },
      'Reviews': function(){
        return ReviewList.find({playId : this._id});
      },
      checkIfAdmin: function(){
        if (Meteor.user()) {
          if (Meteor.user().services.facebook.id === '893362070752768' || Meteor.user().services.facebook.id === '100001350527379') {
            return true;
          }
        } else {
         return false;
       }
      },
      'selected_play' : function(){
        var myPlay = this._id;
        var selected_play = Session.get('selected_play');
        var detailsOfPlay =  PlayList.findOne({_id: selected_play});
        return detailsOfPlay;
      },
      'selected_review' : function(){
        var myReview = this._id;
        var selected_review = Session.get('selected_review');
        var detailsOfReview = ReviewList.findOne({_id: selected_review});
        return detailsOfReview;
      },
      'play_row' : function(){
        currentIndex += 1;
        if (currentIndex % 2 === 0) {
          return 'play-row-white';
        } else {
          return 'play-row-coloured';
        }
      }
  });

  Template.addPlayModal.helpers({
    play_image : function(){
      var imagePresent = Session.get('play_image_file_selected');
      if (imagePresent) {
        return Session.get('image_public_id');
      } else {
        return 'serenahaywood/theatre-curtains';
      }
    }
  });

  Template.editPlayModal.helpers({
    play_image : function(){
      var imagePresent = Session.get('play_image_file_selected');
      if (imagePresent) {
        return Session.get('image_public_id');
      } else {
        var currentPlayId = Session.get('selected_play');
        var currentPlay = PlayList.findOne(currentPlayId);
        return currentPlay.play_image;
      }
    }
  });


  Template.editPlayModal.events({
    'change input[type="file"]': function(event){
      var files = [];
      var file = event.target.files[0];
      files.push(file);

      //upload this image
      Cloudinary.upload(files, {
      folder: "serenahaywood"
      }, function(err, res) {

        console.log("Upload Error: " + err);
        if (err === null) {
          //success in upload - reset the files variable
          files = [];
          Session.set('play_image_file_selected', true);
          Session.set('image_public_id', res.public_id); //store the image_public_id for saving when form submitted
          console.log("Upload Result: " + res.public_id);
        } else {
          //error in the upload: restore the curtains image
            console.log('file upload failed : error: '+ err);
            Session.set('play_image_file_selected', false);
        }
      });
    }
  });

  Template.addPlayModal.events({
    'change input[type="file"]': function(event){
      var files = [];
      var file = event.target.files[0];
      files.push(file);

      //upload this image
      Cloudinary.upload(files, {
      folder: "serenahaywood"
      }, function(err, res) {
        console.log('called');
        console.log("Upload Error: " + err);
        if (err === null) {
          //success in upload - reset the files variable
          files = [];
          Session.set('play_image_file_selected', true);
          Session.set('image_public_id', res.public_id); //store the image_public_id for saving when form submitted
          console.log("Upload Result: " + res.public_id);
        } else {
          //error in the upload: restore the curtains image
            console.log('file upload failed : error: '+ err);
            Session.set('play_image_file_selected', false);
        }
      });
    }
  });

  Template.writing.events({
    'click .details': function (event) {
      event.preventDefault();
      var playId = this._id;
      if (event.target.name == "details") {
        Session.set('selected_play', playId);
      }
    },
    'click .reviews': function (event) {
      event.preventDefault();
      var playId = this._id;

      if (event.target.name == "reviews") {
        Session.set('selected_play', playId);
      }
    },
    'click .review': function (event){
      event.preventDefault;
      var reviewId = this._id;
      if (event.target.name == 'review') {
        Session.set('selected_review', reviewId);
      }
    },
    'submit form.addReview' : function (event) {
      event.preventDefault;
      playId = Session.get('selected_play');

      var newReview ={
        playId : playId,
        stars : event.target.stars.value,
        review : event.target.review.value,
        reviewer : event.target.reviewer.value,
        review_link : event.target.review_link.value
      };
      Meteor.call('newReview', newReview, function(error,res){
        if (!error) {
          console.log('success');
        } else {
          console.log('error' + error);
        }
      });

    },
    'submit form.editReview': function(event){
      event.preventDefault;
      var reviewId = Session.get('selected_review');
      var review = ReviewList.findOne(reviewId);

      var updatedReview = {
        playId : review.playId,
        stars : event.target.stars.value,
        review : event.target.review.value,
        reviewer : event.target.reviewer.value,
        review_link : event.target.review_link.value
      };
      Meteor.call('updateReview', reviewId, updatedReview, function(error,res){
        if (!error) {
          console.log('success');
        } else {
          console.log('error' + error);
        }
      });

    },
    'submit form.addPlay': function(event){
      event.preventDefault;
      //test if there is a new image
      var thereIsANewImage = Session.get('play_image_file_selected');

      if (thereIsANewImage) {
        play_image_file_public_id = Session.get('image_public_id');
        console.log('image id: ' + play_image_file_public_id);

      } else {
        // no new image - add curtains image
        play_image_file_public_id = 'serenahaywood/theatre-curtains'; //this is the public_id of the curtains image
      }

      var newPlay = {
        title: event.target.title.value,
        play_image: play_image_file_public_id,
        date: event.target.date.value,
        festival_name: event.target.festival_name.value,
        theatre_company: event.target.theatre_company.value,
        web_link: event.target.web_link.value,
        facebook_page: event.target.facebook_page.value,
        venue: event.target.venue.value,
        venue_web_link: event.target.venue_web_link.value
      };

      Meteor.call('newPlay', newPlay, function(error,res){
        if (!error) {
          console.log('success');
        } else {
          console.log('error' + error);
        }
      });

    },
    'submit form.updatePlay': function (event) {
      event.preventDefault;
      var playId = Session.get('selected_play');
      var play = PlayList.findOne(playId);

      //test if there is a new image
      var thereIsANewImage = Session.get('play_image_file_selected');

      if (thereIsANewImage) {
        play_image_file_public_id = Session.get('image_public_id');
        var oldImageId = play.play_image;
        console.log('new image id: ' + play_image_file_public_id);
        //delete the old image asynchronously
        Cloudinary.delete(oldImageId, function(err, res){
          console.log('error: '+err);
          console.log('image deleted res: '+res );
        });


      } else {
        // no new image - add curtains image
        play_image_file_public_id = play.play_image;
      }

      var updatedPlay = {
        title: play.title,
        play_image: play_image_file_public_id,
        date: event.target.date.value,
        festival_name: event.target.festival_name.value,
        theatre_company: event.target.theatre_company.value,
        web_link: event.target.web_link.value,
        facebook_page: event.target.facebook_page.value,
        venue: event.target.venue.value,
        venue_web_link: event.target.venue_web_link.value
      };
      Meteor.call('updatePlay', playId, updatedPlay, function(error, res){
        if (!error) {
          console.log('success');
        } else {
          console.log('error: '+ error);
        }
      });

    },
    'click .modalbuttons': function(event){
      if (event.target.name == 'confirmdeleteplay') {
        var playId = this._id;

        $('#DeletePlayModal').modal('hide');
        $('#DeletePlayModal').on('hidden.bs.modal', function () {
            // do something after modal closed

            var play_to_remove = PlayList.findOne(playId);
            var image_to_remove = play_to_remove.play_image;
            Cloudinary.delete(image_to_remove, function(err, res){
              console.log('error: '+err);
              console.log('res: '+res );
            });

            Meteor.call('removePlayAndRelatedReviews', playId, function (error, result) {
              if (error!=null) {
                console.log(error);
              } else {
                console.log(result);
              }
             } );
        })
      }

      if (event.target.name == 'confirmdeletereview') {
        var reviewId = this._id;
        $('#DeleteReviewModal').modal('hide');
        $('#DeleteReviewModal').on('hidden.bs.modal', function () {
            // do something after modal closed
            Meteor.call('deleteReview', reviewId);

        })
      }
    }
});
}
