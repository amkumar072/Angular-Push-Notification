import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MessagingService } from './service/messaging.service';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'push-notification';
  message;
  token;
  constructor(private messagingService: MessagingService, push: SwPush) {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.token = this.messagingService.currenttoken;
    this.message = this.messagingService.currentMessage;



    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    // if (!firebase.apps.length) {
    // firebase.initializeApp(environment.firebase);
    navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr));
    // }
  }

  ngOnInit() {
    // this.messagingService.requestPermission();
    // this.messagingService.receiveMessage();
    // this.token = this.messagingService.currenttoken;
    // this.message = this.messagingService.currentMessage;
  }

}
