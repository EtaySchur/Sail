/**
 * Created by EtaySchur on 11/02/2017.
 */

// namespace app.widgets {
//     'use strict';
//
//     interface IFilesTreeScope {
//         title: string;
//         subtitle: string;
//         rightText: string;
//         allowCollapse: string;
//     }
//     //Usage:
//     //<div ht-widget-header title="vm.map.title"></div>
//     // Creates:
//     // <div ht-widget-header=""
//     //      title="Movie"
//     //      allow-collapse="true" </div>
//     class SpFilesTree implements ng.IDirective {
//         static $inject: Array<string> = [''];
//         constructor() { }
//
//         static instance(): ng.IDirective {
//             return new SpFilesTree();
//         }
//
//         scope: IFilesTreeScope = {
//             'title': '@',
//             'subtitle': '@',
//             'rightText': '@',
//             'allowCollapse': '@'
//         };
//         templateUrl: string = 'app/widgets/files-tree/files-tree.html';
//         restrict: string = 'EA';
//     }
//
//     angular
//         .module('app.widgets')
//         .component('spFilesTree', SpFilesTree.instance);
// }


namespace app.widgets {
    import AngularUiTreeItem = blocks.uiTree.AngularUiTreeItem;

    class FilesTreeCtrl {
        static $inject:Array<string> = ['$scope'];
        private _treeModel:any;
        private selectedFolder: AngularUiTreeItem;
        private browse: boolean;
        private folderClickCallback: Function;
        private expandFolderCallback: Function;


        constructor(private $scope: ng.IScope) {

        }

        /*
            Toggle Folder in the UI Tree - make async call for children if any
         */
        public toggle = (scope:any , node:AngularUiTreeItem) => {
            if(node && node.hasChildren && node.nodes.length === 0){
                this.expandFolderCallback({$folder : node});
            }
            scope.toggle();
        };

        /*
            Collapse All Folders
         */
        public collapseAll = () => {
            this.browse = false;
            this.folderClicked(null);
            this.$scope.$broadcast('angular-ui-tree:collapse-all');
        };


        /*

         */
        public folderClicked = (folder:AngularUiTreeItem) => {
            this.selectedFolder = folder;
            this.folderClickCallback({$folder : folder});
        }

        public set treeModel(treeModel:any) {
            this._treeModel = treeModel;
        }

        public get treeModel () {
            return this._treeModel;
        }
    }

    /*
     Generic Tree View Component - Wrap wanted UI Tree library ( angular-ui-tree this time )
     @params :
        treeModel : Array of Folders ( AngularUiTreeItem )
        folderClickCallback :  Callback function for folder click event
        expandFolderCallback : Callback function getting folder's children ( async )
     */
    class TreeViewComponent implements ng.IComponentOptions {
        templateUrl = 'app/widgets/files-tree/files-tree.html';
        transclude:boolean = true;
        controllerAs:string = 'filesTreeCtrl';
        controller = FilesTreeCtrl;
        bindings:{ [index:string]:string; } = {treeModel : '<' , folderClickCallback: '&' , expandFolderCallback: '&'}
    }


    angular.module('app.widgets').component('etTreeView', new TreeViewComponent());
}
