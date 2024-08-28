import { Component } from "@angular/core";
import { IfAuthenticatedDirective } from "./if-authenticated.directive";
import { TestBed } from "@angular/core/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { UserService } from "./services/user.service";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

@Component({
  standalone: true,
  template: `
    <div *ifAuthenticated="false">
      <h1 data-testid="unauthenticated">unauthenticated</h1>
    </div>
    <div *ifAuthenticated="true">
      <h1 data-testid="authenticated">authenticated</h1>
    </div>
  `,
  imports: [IfAuthenticatedDirective],
})
class FixtureComponent {}
describe("ifAuthenticatedDirective", () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [IfAuthenticatedDirective, FixtureComponent],
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it("should compile component with directive", () => {
    const fixture = TestBed.createComponent(FixtureComponent);
    const componet = fixture.componentInstance;
    expect(componet).toBeTruthy();
  });

  it("should render only guest elements", () => {
    const fixture = TestBed.createComponent(FixtureComponent);
    // update bindings
    fixture.detectChanges();
    const debugEl = fixture.debugElement.queryAll(
      By.css("[data-testid=unauthenticated]"),
    );
    expect(debugEl.length).toEqual(1);
  });

  it("should render only user authenticated elements", () => {
    TestBed.configureTestingModule({
      imports: [IfAuthenticatedDirective, FixtureComponent],
      providers: [
        { provide: UserService, useValue: { isAuthenticated: of(true) } },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    const fixture = TestBed.createComponent(FixtureComponent);
    fixture.detectChanges();
    const debugEl = fixture.debugElement.queryAll(
      By.css("[data-testid=authenticated]"),
    );
    expect(debugEl.length).toEqual(1);
  });
});
