let mix = require('laravel-mix');

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

mix.setPublicPath('frontend')
   .setResourceRoot('../')
   .js('resources/assets/js/config.js', 'frontend/js')
   .js('resources/assets/js/live-config.js', 'frontend/js')
   .js('resources/assets/js/viewer.js', 'frontend/js')
   .options({
       uglify: false
   })
   .sass('resources/assets/sass/app.scss', 'frontend/css')
   .extract([
       'axios', 'lodash', 'vue', 'vue-router'
   ]);
