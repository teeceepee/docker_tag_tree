//= require react

var Gif = React.createClass({
  displayName: 'Gif',

  href: function() {
    return this.props.gif.links[0];
  },

  img: function() {
    return React.createElement('img', {
      src: this.props.gif.icon,
      title: this.props.gif.title,
      alt: this.props.gif.title
    });
  },

  title: function() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'span',
        null,
        this.props.gif.id + ' '
      ),
      React.createElement(
        'a',
        {
          className: 'search-link',
          href: this.href(),
          target: '_blank'
        },
        this.props.gif.title
      )
    );
  },

  a: function() {
    return React.createElement('a', {title: this.props.gif.title, target: '_blank'}, this.img());
  },

  render: function() {
    return React.createElement(
      'div',
      {className: 'gif'},
      this.title(),
      this.a());
  }
});

var GifList = React.createClass({
  displayName: 'GifList',

  gifs: function(gifs) {
    return gifs.map(function(gif) {
      return React.createElement(Gif, {gif: gif})
    });
  },
  render: function() {
    nodes = this.gifs(this.props.gifs);
    return React.createElement('div', {className: 'gif-list'}, nodes);
  }
});

var renderAll = function(gifs) {
  ReactDOM.render(
    React.createElement(GifList, {gifs: gifs}),
    document.getElementById('gifs-container')
  );
};


var url = '/d/bilibili_gifs';
var xhr = $.ajax({
  url: url,
  method: 'get',
  dateType: 'json'
}).done(function(data) {
  var gifs = data.fix;
  renderAll(gifs);
});
