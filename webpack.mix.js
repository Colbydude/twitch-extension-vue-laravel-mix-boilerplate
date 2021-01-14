const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public')
   .js('resources/js/config.js', 'js').vue()
   .js('resources/js/dashboard.js', 'js').vue()
   .js('resources/js/mobile.js', 'js').vue()
   .js('resources/js/panel.js', 'js').vue()
   .js('resources/js/video_component.js', 'js').vue()
   .js('resources/js/video_overlay.js', 'js').vue()
   .sass('resources/sass/app.scss', 'css').vue()
   .options({
       uglify: false
   })
   .extract([
       'axios', 'vue'
   ]);
