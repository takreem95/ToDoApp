import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  title;
  description;
  splash = true;
 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData().then((todos) => {
 
      if(todos){
        this.items = todos;
      }
 
    });
 
  }
 
  ionViewDidLoad(){
    setTimeout(() => this.splash = false, 10000);

  }
 
  addItem(){
 
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((item) => {
 
          if(item){
            this.saveItem(item);
          }
 
    });
 
    addModal.present();
 
  }

  edit(item){
    
  }

  delete(item){
    var index = this.items.indexOf(item, 0);
    if (index > -1) {
        this.items.splice(index, 1);
        this.dataService.delete(this.items);
    }
  }
 
  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }
 
  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
