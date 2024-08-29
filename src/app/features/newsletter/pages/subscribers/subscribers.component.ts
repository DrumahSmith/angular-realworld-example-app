import { Component, OnInit, inject } from "@angular/core";
import { Subscriber } from "../../models/subscriber.model";
import { NgForOf } from "@angular/common";
import { SubscribersService } from "../../services/subscribers.service";
import { IfAuthenticatedDirective } from "src/app/core/auth/if-authenticated.directive";

@Component({
  selector: "app-subscribers",
  standalone: true,
  imports: [NgForOf, IfAuthenticatedDirective],
  templateUrl: "./subscribers.component.html",
  styleUrl: "./subscribers.component.css",
})
export default class SubscribersComponent implements OnInit {
  subscribers: Subscriber[] = [];

  constructor(private readonly subscribersService: SubscribersService) {
    this.getSubscribers();
  }

  ngOnInit(): void {}

  private getSubscribers() {
    this.subscribersService.getSubscribers().subscribe((subscribers) => {
      this.subscribers = subscribers;
    });
  }

  public deleteSubscriber(email: string) {
    this.subscribersService.deleteSubscriber(email);
    // depending on resources we will call for the latest data from the server,
    // if requests are limited then we will work with the local copy
    // with some form of cached time before refering back to the server
    this.getSubscribers();
  }
}
