import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-root',
  template: `
  <table >
  <colgroup>
    <col span="2" style="background:Khaki"><!-- С помощью этой конструкции задаем цвет фона для первых двух столбцов таблицы-->
    <col span="2" style="background-color:LightCyan"><!-- Задаем цвет фона для следующего (одного) столбца таблицы-->
  </colgroup>
        <thead>
            <tr>
                <th>Место</th>
                <th>Сумма, руб</th>
                <th>Оформлен</th>
                <th>Доставлен</th>
                <th>Состав заказа</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let item of items | async">
                <td style="padding: 10px">
                Выбран<br> <b>{{item.chosen_place}}</b> из 
                <span *ngFor="let place of item.suggested_places  ">{{place}};<br></span>
                </td>
                <td style="padding: 10px">{{item.sum / 100}}</td>
                <td style="padding: 10px">{{item.date_started}}</td>
                <td style="padding: 10px">{{item.date_delivered}}</td>
                <td style="padding: 10px">
					    <span *ngFor="let person of toArray(item.participants) ">
					      <b>{{ person.fullname }}:</b> 
					      <span *ngFor="let dish of person.dishes  ">
					      	{{dish}}; 
					      </span><br>
					    </span>
                </td>

            </tr>
        </tbody>
    </table>

  `
})
export class AppComponent {
	toArray(participants: object) {
    return Object.keys(participants).map(key => ({
      key,
      ...participants[key]
    }))
  }

	private itemsCollection: AngularFirestoreCollection<Item>;
  	items: Observable<Item[]>;
  	

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('stats', ref => ref.where('chat_name','==','Food_order'));
    this.items = this.itemsCollection.valueChanges();


  }

  

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}