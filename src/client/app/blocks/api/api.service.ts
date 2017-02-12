/**
 * Created by EtaySchur on 11/02/2017.
 */

namespace blocks.api {
    'use strict';

    export interface IApi {
        getMockJson: (jsonFileName:any) => any;
    }

    /*
        Mock Server API - handle getting folders data
     */
    export class Api implements IApi {
        static $inject: Array<string> = ['$log', '$http'];
        constructor(private $log: ng.ILogService, private $http: any) {

        }


        /*
            Return promise of the folder by mock json name
         */
        getMockJson (jsonFileName:any){
            return this.$http.get('/JSON/' + jsonFileName + '.json');
        }

    }

    angular
        .module('blocks.api')
        .service('api', Api);
}

