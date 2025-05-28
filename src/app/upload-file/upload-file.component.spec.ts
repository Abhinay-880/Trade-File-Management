import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileComponent } from './upload-file.component';
import { HttpClientModule } from '@angular/common/http';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFileComponent,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
