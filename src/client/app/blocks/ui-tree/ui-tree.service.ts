/**
 * Created by EtaySchur on 11/02/2017.
 */



namespace blocks.uiTree {
    'use strict';
    import Folder = app.dashboard.Folder;
    import File = app.dashboard.File;

    export class AngularUiTreeItem {
        id:number;
        title:string;
        nodes:AngularUiTreeItem[];
        hasChildren: boolean;
        files: File[];
    }

    export interface IUiTree {
        parseItems:(folders:Folder[]) => any;
    }

    /*
        Dedicated Service to Angular UI Tree
        Take Care of Parsing Server Item to Angular UI Tree Object
     */
    export class AngularUiTree implements IUiTree {
        static $inject:Array<string> = ['$log'];

        constructor(private $log:ng.ILogService) {
        }

        /*
            Parse Server items into Angular UI Tree Objects
         */
        parseItems(folders:Folder[]) {
            let uiTreeItems = folders.map((folder:Folder) => {
                let uiTreeItem = new AngularUiTreeItem();
                uiTreeItem.id = folder.id;
                uiTreeItem.title = folder.name;
                uiTreeItem.files = folder.files;
                uiTreeItem.nodes = [];
                uiTreeItem.hasChildren = folder.hasChildren;

                return uiTreeItem;
            });

            return uiTreeItems;
        };
    }

    angular
        .module('blocks.uiTree')
        .service('angularUiTreeService', AngularUiTree);
}

