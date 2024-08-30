import { Component, OnInit } from "@angular/core";
import { SubscribersService } from "../../services/subscribers.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
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
  subscriberEmail: string = "";

  constructor(
    private readonly subscribersService: SubscribersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly sendMailService: SendmailService,
  ) {
    this.subscriberForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params["username"];
  }

  public onSubmit() {
    this.submitted = true;
    console.log("submitted");

    if (this.subscriberForm.invalid) {
      return;
    }
    // return;
    const email = this.subscriberForm.value.email;
    this.subscribersService
      .addSubscriber(this.username, email)
      .subscribe((subscriber: Subscriber) => {
        const subscribedEmail = subscriber?.email;
        console.log(subscribedEmail);
        if (!subscribedEmail) {
          // error
          alert("unable to subscribe at this time");
          return;
        }
        // send email confirmation
        /*
      ideally we would send the confirmation as a queued task from our backend
      But as we don't have control over the backend
     */
        this.sendMailService.sendmail(subscribedEmail);
      });
  }

  onReset() {
    this.submitted = false;
    this.subscriberForm.reset();
  }
}
