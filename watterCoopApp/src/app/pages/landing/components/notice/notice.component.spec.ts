import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeComponent, NoticeData } from './notice.component';

describe('NoticeComponent', () => {
  let component: NoticeComponent;
  let fixture: ComponentFixture<NoticeComponent>;

  const mockNoticeData: NoticeData = {
    id: '1',
    title: 'Mantenimiento Programado',
    message: 'Se realizará mantenimiento en el sistema de agua potable el próximo lunes de 8:00 a 12:00 horas. Agradecemos su comprensión.',
    imageUrl: 'assets/images/icons/alert-icon.png',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    priority: 'high',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeComponent);
    component = fixture.componentInstance;
    component.noticeData = mockNoticeData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notice when data is provided and active', () => {
    expect(component.showNotice).toBeTruthy();
  });

  it('should hide notice when data is not provided', () => {
    component.noticeData = undefined;
    component.ngOnInit();
    expect(component.showNotice).toBeFalsy();
  });

  it('should get correct priority icon for high priority', () => {
    expect(component.getPriorityIcon()).toBe('pi-exclamation-circle');
  });

  it('should get correct priority text for high priority', () => {
    expect(component.getPriorityText()).toBe('ALTO');
  });

  it('should close notice when close button is clicked', () => {
    component.closeNotice();
    expect(component.showNotice).toBeFalsy();
  });

  it('should format date correctly', () => {
    const testDate = new Date('2024-01-15');
    expect(component.formatDate(testDate)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});
