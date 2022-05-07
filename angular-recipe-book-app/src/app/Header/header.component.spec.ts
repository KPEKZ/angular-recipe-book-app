import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { provideMockStore} from "@ngrx/store/testing"

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    headerComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should create',() => {
    expect(headerComponent).toBeTruthy();
  });

  it('should to call onFetchData()', () => {
    headerComponent.onFetchData = jasmine.createSpy();
    headerComponent.ngOnInit();
    headerComponent.onFetchData();
    expect(headerComponent.onFetchData).toHaveBeenCalled();
  });

});
