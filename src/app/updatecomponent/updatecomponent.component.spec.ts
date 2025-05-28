import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecomponentComponent } from './updatecomponent.component';
import {  HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('UpdatecomponentComponent', () => {
  let component: UpdatecomponentComponent;
  let fixture: ComponentFixture<UpdatecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecomponentComponent,HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'mockValue' } } } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdatecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
