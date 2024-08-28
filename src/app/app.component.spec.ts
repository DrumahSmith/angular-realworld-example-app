import { AppComponent } from "./app.component";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./core/auth/services/user.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

describe("AppComponent", () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
