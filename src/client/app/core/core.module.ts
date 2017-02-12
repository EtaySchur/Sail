namespace app.core {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.api', 'blocks.pieChart', 'blocks.uiTree',
      'ui.router', 'ngplus', 'ui.tree', 'nvd3'
    ]);
}
