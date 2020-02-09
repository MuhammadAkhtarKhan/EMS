import { Component, NgZone } from '@angular/core';
import { FoodNode } from './FoodNode';
import {ExampleFlatNode} from './exampleflatnode';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Cast } from './models/cast';
import { Router } from '@angular/router';


const TREE_DATA: FoodNode[] = [
  {
    name: 'Definitions',
    children: [
      {name: 'Cast'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EMS';
  opened = false;
private _transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level
  };
}

  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private ngZone: NgZone, private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  logNode(node) {
    console.log(node);
    const name = node.name;
    // switch (name){
    //   case 'cast' : {
    //       `<app-cast></app-cast>`
    //       break;
    //   }
    //       default : {
    //       '<app-root></app-root>'
    //       break
    //   }
    // }
    if(name === 'Cast'){
      this.ngZone.run(() => this.router.navigateByUrl('cast'));
  } else {
      console.log(name)
  }
  }  
}
