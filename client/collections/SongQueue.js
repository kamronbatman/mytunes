// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.listenTo(this, 'add', function(){
      this.trigger('shouldplaynext', this.hasOnlyOne.bind(this));
    });

    this.listenTo(this, 'shouldplaynext', function(test){
      if (test()) {
        this.playFirst();
      }
    });

    this.listenTo(this, 'ended', function(){
      this.first().dequeue();
      this.trigger('shouldplaynext', this.hasMoreThanOne.bind(this));
    });
  },

  hasOnlyOne: function(){
    return this.length === 1;
  },

  hasMoreThanOne: function(){
    return this.length > 0;
  },

  playFirst: function(){
    var next = this.first();

    if (next !== undefined){
      next.play();
    }
  },
});
