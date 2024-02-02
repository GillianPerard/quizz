import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

const APP_NAME = 'Quizz';

@Injectable({ providedIn: 'root' })
export class RouteTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.title.setTitle(title ? `${title} | ${APP_NAME}` : APP_NAME);
  }
}
