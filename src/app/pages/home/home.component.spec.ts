import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import HomeComponent from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizzService } from '../../services/quizz/quizz.service';
import { of } from 'rxjs';
import { AnswerType } from '../../services/quizz/answer-type.enum';

describe('HomeComponent', () => {
  let quizzService: QuizzService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [QuizzService],
    }).compileComponents();

    quizzService = TestBed.inject(QuizzService);
  });

  it('should render loader then quizz', fakeAsync(() => {
    spyOn(quizzService, 'getQuestions').and.returnValue(
      of([{ answer: '1', answerType: AnswerType.Text, label: 'test' }])
    );

    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.loader')).toBeTruthy();
    expect(compiled.querySelector('h5')?.textContent).toEqual('0 questions');
    tick(400);
    fixture.detectChanges();
    expect(quizzService.getQuestions).toHaveBeenCalled();
    expect(compiled.querySelector('.loader')).toBeFalsy();
    expect(compiled.querySelector('h5')?.textContent).toEqual('1 questions');
  }));

  it('should render loader then error', fakeAsync(() => {
    spyOn(quizzService, 'getQuestions').and.returnValue(of([]));
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.loader')).toBeTruthy();
    expect(compiled.querySelector('h5')?.textContent).toEqual('0 questions');
    tick(400);
    fixture.detectChanges();
    expect(quizzService.getQuestions).toHaveBeenCalled();
    expect(compiled.querySelector('.loader')).toBeFalsy();

    expect(compiled.querySelector('h1')?.textContent).toEqual(
      'Impossible de récuperer les questions'
    );

    expect(compiled.querySelector('h5')?.textContent).toEqual('Réessayez plus tard');
  }));

  const values: Array<[number, string]> = [
    [0, '00'],
    [1, '01'],
    [10, '10'],
  ];

  values.forEach(([value, result]) => {
    it(`should render ${result} for best score ${value}`, () => {
      spyOn(quizzService, 'getBestScore').and.returnValue(of(value));
      const fixture = TestBed.createComponent(HomeComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
      expect(compiled.querySelector('h2')?.textContent).toEqual(`${result}/10`);
    });
  });
});
