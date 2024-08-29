import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-subscribe-button",
  template: `
    <button
      class="btn btn-sm action-btn mr-3"
      style="margin-right: .5em;"
      (click)="goToSubscribe()"
    >
      <i class="ion-notepad"></i> <ng-content></ng-content>
    </button>
  `,
  imports: [NgClass],
  standalone: true,
})
export class SubscribeButtonComponent {
  @Input() username!: string;

  constructor(private readonly router: Router) {}

  goToSubscribe(): void {
    void this.router.navigate([`/newsletter/sign-up/${this.username}`]);
  }
}
