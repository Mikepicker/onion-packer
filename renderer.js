var fs = require('fs');
var path = './textures/';

// Get textures
var getTextures = () => {
  var texturesArray = [];
  var files = fs.readdirSync(path);
  files.forEach(file => {
      texturesArray.push(path + file);
  });
  console.log(texturesArray);
  return texturesArray;
}

// Vue components
var textures = new Vue({
  el: '#textures',
  data: {
    textures: getTextures()
  }
});

Vue.component('texture-list', {
  props: ['textures'],
  template: '\
    <div class="texture-container container-fluid"/>\
      <div class="row">\
        <div id="textures">\
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-for="texture in textures"/>\
            <img class="texture-thumb img-responsive img-rounded" :src="texture" alt=""/>\
          </div>\
        </div>\
      </div>\
    </div>'
});
