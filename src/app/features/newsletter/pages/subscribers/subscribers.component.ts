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
}
