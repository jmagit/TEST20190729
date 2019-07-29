import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/common-app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Curso de Angular';

  // constructor(out: LoggerService) {
  //   out.error('Esto es un error');
  //   out.warn('Esto es un warn');
  //   out.info('Esto es un info');
  //   out.log('Esto es un log');
  // }

  constructor(notify: NotificationService) {
    // notify.add('Una demo');
    // notify.remove(0);
    // notify.add(null);
    // notify.remove(0);
  }
  ngOnInit() {
  }

}
