import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelServicesComponent } from './channel-services.component';

describe('ChannelServicesComponent', () => {
  let component: ChannelServicesComponent;
  let fixture: ComponentFixture<ChannelServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
