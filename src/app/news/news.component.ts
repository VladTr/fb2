// компонент отвечающий за построение страницы новостей
import { Component, OnInit } from '@angular/core';
import {LocalService} from "../local.service";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news:any;
  loc:any;
  constructor(private localService:LocalService, private af:AngularFire) { }

// получаем данные из firebase для построения страницы новостей
  getServerData(){
    this.loc=this.localService.getSettledLocale();
    this.news=this.af.database.list(this.loc+  '/news/', {query:{
      orderByChild: 'order'
    }});
  }

  ngOnInit() {
    // ловим изменения языка настройки для ререндеринга
    this.localService.getLocale().subscribe(
        data=>this.getServerData()
    );
    this.getServerData();
  }

}
