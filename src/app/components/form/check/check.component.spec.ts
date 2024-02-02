import { TestBed } from '@angular/core/testing';
import { CheckComponent } from './check.component';
import { Component } from '@angular/core';

@Component({
  imports: [CheckComponent],
  standalone: true,
  template: `
    <app-check name="test" [checked]="checked" value="test" [radio]="radio">test</app-check>
  `,
})
class MockComponent {
  checked = false;
  radio = false;
}

describe('CheckComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [],
    }).compileComponents();
  });

  it('should display unchecked input checkbox', () => {
    const fixture = TestBed.createComponent(MockComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const input = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement | undefined;
    expect(input).toBeTruthy();
    expect(input?.checked).toBeFalse();
  });

  it('should display checked input radio', () => {
    const fixture = TestBed.createComponent(MockComponent);
    fixture.componentInstance.checked = true;
    fixture.componentInstance.radio = true;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const input = compiled.querySelector('input[type="radio"]') as HTMLInputElement | undefined;
    expect(input).toBeTruthy();
    expect(input?.checked).toBeTrue();
  });

  it('should check then uncheck for checkbox', () => {
    const fixture = TestBed.createComponent(MockComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const input = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement | undefined;
    expect(input?.checked).toBeFalse();
    input?.click();
    expect(input?.checked).toBeTrue();
    input?.click();
    expect(input?.checked).toBeFalse();
  });

  it('should check then nothing for radio', () => {
    const fixture = TestBed.createComponent(MockComponent);
    fixture.componentInstance.radio = true;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const input = compiled.querySelector('input[type="radio"]') as HTMLInputElement | undefined;
    expect(input?.checked).toBeFalse();
    input?.click();
    expect(input?.checked).toBeTrue();
    input?.click();
    expect(input?.checked).toBeTrue();
  });
});
