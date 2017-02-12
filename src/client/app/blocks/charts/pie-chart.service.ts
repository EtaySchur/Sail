/**
 * Created by EtaySchur on 11/02/2017.
 */

namespace blocks.pieChart {
    'use strict';
    import File = app.dashboard.File;

    export class NvdChartItem {
        key:string;
        y:number;
    }

    export interface IPieChartService {
        parseItems:(files:File[]) => any;
        getOptions:()=> any; // Get Chart Default Options
    }

    /*
     Dedicated Service to NVD Pie Chart
     Take Care of Parsing Server Item to Angular  NVD Pie Chart Items
     */
    export class NvdPieChartService implements IPieChartService {
        static $inject:Array<string> = ['$log'];

        constructor(private $log:ng.ILogService) {

        }

        getOptions() {
            return {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    x: (d:any) => {
                        return d.key;
                    },
                    y: (d:any) => {
                        return d.y;
                    },
                    showLabels: true,
                    duration: 0,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 5
                        }
                    }
                }

            }
        }

        /*
         Aggregate file by type and sum the size , parse items to NVD  Pie Chart Objects
         */
        parseItems(files:File[]) {
            let chartObjects:any = {};
            angular.forEach(files, (file:File) => {
                if (!chartObjects[file.type]) {
                    chartObjects[file.type] = 0;
                }
                chartObjects[file.type] += file.size;
            });
            let chartItemsArray:any = [];
            for (var key in chartObjects) {
                chartItemsArray.push({
                    key: key,
                    y: chartObjects[key]
                })
            }
            return chartItemsArray;
        }

    }

    angular
        .module('blocks.pieChart')
        .service('pieChartService', NvdPieChartService);
}

