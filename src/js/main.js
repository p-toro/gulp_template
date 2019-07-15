/**
 * main.js
 *
 * @date 2019-01-01
 */

(function($) {

  const NAME_SPACE = window.NAME_SPACE || {};

  NAME_SPACE.Main = function() {

    const _init = function() {
      _doSomething();
    };

    const _doSomething = ()=> {
      console.log('doSomething');
    };

    return {
      init: _init
    };

  }();

  NAME_SPACE.Main.init();

})(jQuery);
