// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.queueView = new SongQueueView({collection: this.model.get('songQueue')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);


    var queue = this.model.get('songQueue');
    var library = this.model.get('library');
    var self = this;

    queue.listenTo(library, 'enqueue', function(song){
      this.add(song.clone());
      self.queueView.render();
    });

    queue.listenTo(queue, 'dequeue', function(){
      this.shift();
      self.queueView.render();
    });
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.queueView.$el,
      this.libraryView.$el
    ]);
  }

});
