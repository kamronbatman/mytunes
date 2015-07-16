// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('enqueue', function(song){
      this.add(song);
    }, this);

    this.on('add', function(song){
      this.trigger('shouldplaynext', this.hasOnlyOne.bind(this));
    }, this);

    this.on('shouldplaynext', function(test){
      if (test()) {
        this.playFirst();
      }
    });

    this.on('dequeue', function(){
      this.remove(this.at(this.length-1));
    }, this);

    this.on('ended', function(){
      this.shift();
      this.trigger('shouldplaynext', this.hasMoreThanOne.bind(this));
    }, this);
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
