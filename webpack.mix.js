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
   .js('resources/js/config.js', 'js')
   .js('resources/js/dashboard.js', 'js')
   .js('resources/js/mobile.js', 'js')
   .js('resources/js/panel.js', 'js')
   .js('resources/js/video_component.js', 'js')
   .js('resources/js/video_overlay.js', 'js')
   .sass('resources/sass/app.scss', 'css')
   .options({
       uglify: false
   })
   .extract([
       'axios', 'vue'
   ]);
