import { Component, OnInit } from "@angular/core";
import { SubscribersService } from "../../services/subscribers.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { map, pipe } from "rxjs";
import { Subscriber } from "../../models/subscriber.model";
import { SendmailService } from "../../services/sendmail.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export default class SignUpComponent implements OnInit {
  username: string = "";
  submitted = false;
  subscriberForm!: FormGroup;

  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly sendMailService: SendmailService,
  ) {
    this.subscriberForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params["username"];
  }

  private addSubscriber(email: string) {
    this.subscribersService
      .addSubscriber(this.username, email)
      .subscribe((subscriber: Subscriber) => {
        const subscribedEmail = subscriber?.email;
        if (!subscribedEmail) {
          // error
          alert("unable to subscribe at this time");
        }
        // send email confirmation
        /*
        ideally we would send the confirmation as a queued task from our backend
        But as we don't have control over the backend
       */
        this.sendMailService.sendmail(subscribedEmail);
      });
  }

  public onSubmit() {
    this.submitted = true;
    console.log("submitted");
    if (this.subscriberForm.invalid) {
      return;
    }
    // console.log(this.subscriberForm.value.email);
    // return;

    this.addSubscriber(this.subscriberForm.value.email);
  }

  onReset() {
    this.submitted = false;
    this.subscriberForm.reset();
  }
}
