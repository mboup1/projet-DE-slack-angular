import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostServicesComponent } from './post-services.component';

describe('PostServicesComponent', () => {
  let component: PostServicesComponent;
  let fixture: ComponentFixture<PostServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
