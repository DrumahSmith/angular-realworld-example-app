import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { Subscriber } from "../models/subscriber.model";
import { Profile } from "../../profile/models/profile.model";

// TODO: remove once api endpoints have be updated
let subscriberList: Subscriber[] = [
  {
    email: "example@mail.com",
  },
  {
    email: "example2@mail.com",
  },
  {
    email: "example3@mail.com",
  },
  {
    email: "example4@mail.com",
  },
];

@Injectable({
  providedIn: "root",
})
export class SubscribersService {
  constructor() {}

  // TODO: update with call to endpoint
  public getSubscribers(): Observable<Subscriber[]> {
    // http get call route /profile/${username}/newsletter
    return of(subscriberList);
  }

  // TODO: update with call to enpoint
  public addSubscriber(
    username: string,
    email: string,
  ): Observable<Subscriber> {
    // http post call route /profile/${username}/newsletter
    subscriberList.push({ email });
    return of({ email });
  }

  // TODO: update with call to endpoint
  public deleteSubscriber(email: string): Observable<void> {
    // http delete call route /profile/${username}/newsletter with payload {email}

    subscriberList = subscriberList.filter(
      (subscriber) => subscriber.email !== email,
    );
    return EMPTY;
  }
}
