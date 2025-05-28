import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledetailsComponent } from './filedetails.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('FiledetailsComponent', () => {
  let component: FiledetailsComponent;
  let fixture: ComponentFixture<FiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiledetailsComponent,HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'mockValue' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
