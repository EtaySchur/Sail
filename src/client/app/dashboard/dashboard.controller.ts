namespace app.dashboard {
    'use strict';
    import AngularUiTreeItem = blocks.uiTree.AngularUiTreeItem;
    import NvdChartItem = blocks.pieChart.NvdChartItem;

    export class File {
        name:string;
        type:string;
        size:number;
    }
    ;

    export class Folder {
        id:number;
        name:string;
        hasChildren:boolean;
        files:File[];
    }


    interface IFileTypeBrowserCtrl {
        folders:Folder[];
        files:File[];
        title:string;
        handleFolderClick:(folder:AngularUiTreeItem) => any;
        expandFolder:(folder: AngularUiTreeItem) => any;
        chartOptions:any;
    }

    export class FileTypeBrowser implements IFileTypeBrowserCtrl {
        static $inject:Array<string> = ['logger', 'api', 'angularUiTreeService', 'pieChartService', '$scope'];

        constructor(private logger:blocks.logger.Logger,
                    private api:blocks.api.Api,
                    private angularUiTreeService:blocks.uiTree.AngularUiTree,
                    private pieChartService:blocks.pieChart.NvdPieChartService,
                    private $scope:any) {
            this.getMockData();
            this.chartOptions = this.pieChartService.getOptions();

        }

        files:Array<NvdChartItem> = [];
        folders:Array<AngularUiTreeItem> = [];
        title:string = 'Files Type Browser';
        chartOptions = {};

        handleFolderClick(folder:AngularUiTreeItem) {
            if(folder){
                this.files = this.pieChartService.parseItems(folder.files);
            }else{
                this.files = [];
            }
        }

        expandFolder(folder:AngularUiTreeItem){
            this.api.getMockJson(folder.id).then((response:any) => {
                if (response.status === 200 && response.data.length > 0) {
                    folder.nodes = this.angularUiTreeService.parseItems(response.data);
                }
            }).catch((err:any) => {
                this.logger.error("Error getting server data ", err);
            });
        }

        getMockData() {
            this.api.getMockJson('server').then((response:any) => {
                if (response.status === 200 && response.data.length > 0) {
                    this.folders = this.angularUiTreeService.parseItems(response.data)
                }
            }).catch((err:any) => {
                this.logger.error("Error getting server data ", err);
            });
        }
    }

    angular
        .module('app.dashboard')
        .controller('FileTypeBrowserCtrl', FileTypeBrowser);
}
