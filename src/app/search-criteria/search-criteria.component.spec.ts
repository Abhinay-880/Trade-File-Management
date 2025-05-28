import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCriteriaComponent } from './search-criteria.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

describe('SearchCriteriaComponent', () => {
  let component: SearchCriteriaComponent;
  let fixture: ComponentFixture<SearchCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCriteriaComponent,HttpClientModule],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
