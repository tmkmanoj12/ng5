import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service'
import * as request from 'request'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true })
        ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  constructor(private _data: DataService) { }
  itemCount: number = 10
  btnText: string = "Please add item"
  goalText: string = "My first Goal"
  goals = []
  ngOnInit() {

    this._data.goal.subscribe(res => { this.goals = res });
    this.itemCount = this.goals.length
    this._data.changeGoal(this.goals)
  }
  addItem() {
    request.get('https://jsonplaceholder.typicode.com/todos/2', function (err, response, body) {
      alert(body)
    })
    this.goals.push(this.goalText)
    this.goalText = ''
    this.itemCount = this.goals.length
    this._data.changeGoal(this.goals)

  }
  removeItem(i) {
    this.goals.splice(i, 1)
    this._data.changeGoal(this.goals)
  }

}
