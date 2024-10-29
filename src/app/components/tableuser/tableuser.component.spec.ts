import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableuserComponent } from './tableuser.component';

describe('TableuserComponent', () => {
  let component: TableuserComponent;
  let fixture: ComponentFixture<TableuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
