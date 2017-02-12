namespace app.dashboard {
  'use strict';

  angular
    .module('app.dashboard')
    .config(configureStates);

  configureStates.$inject = ['$stateProvider'];
  /* @ngInject */
  function configureStates($stateProvider: ng.ui.IStateProvider) {
    var states = getStates();
    states.forEach(function(state) {
      $stateProvider.state(state.state, state.config);
    });
  }

  function getStates() {
    return [
      {
        state: 'file-types-browser',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'FileTypeBrowserCtrl',
          controllerAs: 'fileTypesCtrl',
          title: 'file-types-browser',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }
}
