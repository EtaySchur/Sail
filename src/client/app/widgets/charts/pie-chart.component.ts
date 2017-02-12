/**
 * Created by EtaySchur on 11/02/2017.
 */

namespace app.widgets {
    import AngularUiTreeItem = blocks.uiTree.AngularUiTreeItem;
    import NvdChartItem = blocks.pieChart.NvdChartItem;
    class PieChartCtrl {
        static $inject:Array<string> = ['$scope'];
        private _options:any;
        private _items:any;
        private totalSize: number = 0;


        constructor(private $scope:any) {

        }

        public set options(options:any){
            this._options = options;
        }

        public get options(){
            return this._options;
        }

        public set items(items:NvdChartItem[]){
            if(items){
                this.totalSize = 0;
                this._items = items;
                angular.forEach(items, (item:NvdChartItem) => {
                   this.totalSize += item.y;
                });

            }
        }

        public get items(){
            return this._items;
        }


    }

    /*
        Generic Pie Chart Component - Wrap wanted pie chart library ( NVD this time )
        @params :
            items : Array of items ( NvdChartItem )
            options : NVD Pie Chart Options Object
     */
    class PieChartComponent implements ng.IComponentOptions {
        templateUrl = 'app/widgets/charts/pie-chart.html';
        transclude:boolean = true;
        controllerAs:string = 'pieChartCtrl';
        controller = PieChartCtrl;
        bindings:{ [index:string]:string; } = {items : '<' , options : '<'}
    }


    angular.module('app.widgets').component('etPieChart', new PieChartComponent());
}
