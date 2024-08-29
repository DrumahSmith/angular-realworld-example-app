import { Injectable } from "@angular/core";
// import sgMail from "@sendgrid/mail";
// would normally come from an environment configuration
const myFakeApiKey = "fakeKey";
const fromEmail = "test@example.com";

@Injectable({
  providedIn: "root",
})
export class SendmailService {
  constructor() {}

  sendmail(email: string) {
    return true;

    // commented out as I ran into a library dependancy conflict
    /*
    sgMail.setApiKey(myFakeApiKey);
    const msg = {
      to: email, // Change to your recipient
      from: fromEmail, // Change to your verified sender
      subject: "You have been signed up",
      text: "you have subscribed",
      html: "<strong>You have subscribed</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

      */
  }
}
