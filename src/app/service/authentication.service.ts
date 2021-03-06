﻿import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoginResponseDto, LoginRequestDto} from '../dto';
import {InfoService} from './info.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
                private router: Router,
                private translate: TranslateService,
                private infoService: InfoService) { }

    login(loginRequestDto: LoginRequestDto) {
        return this.http.post<LoginResponseDto>(`${environment.serverUrl}auth/login`, loginRequestDto)
            .pipe(map((res: LoginResponseDto) => {
                this.infoService.alertInformation(res.errorDto.error, res.errorDto.message);
                if (res && res.token) {
                    this.translate.use(res.languageName);
                  this.setDomTheme(res.themeName);
                    localStorage.setItem('currentUser', JSON.stringify({ id: res.userId, username: loginRequestDto.username,
                      token: res.token, userRole: res.userRole, language: res.languageName, theme: res.themeName }));
                  this.router.navigate(['/']);
                }
            }));
    }

    setDomTheme(theme: string){
      let themeElem = document.getElementsByName("themeElem")[0];
      let themeClass = themeElem.classList[0];
      themeElem.classList.remove(themeClass);
      themeElem.classList.add("theme-" + theme.toLowerCase());
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    activate(code: string) {
      return this.http.get(`${environment.serverUrl}auth/activate/` + code);
    }

    sendCodeNewPassword(email: string) {
      return this.http.post(`${environment.serverUrl}auth/sendCodeNewPassword`, email);
    }

    sendNewPassword(code: string, password: string) {
      return this.http.post(`${environment.serverUrl}auth/changeNewPassword/` + code, password);
    }

    isLogin(): boolean {
      return JSON.parse(localStorage.getItem('currentUser')) !== null;
    }

    isId(): number {
      return JSON.parse(localStorage.getItem('currentUser')).id;
    }

    isAdmin(): boolean {
      return this.isLogin() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_ADMIN' : false;
    }

    isWriter(): boolean {
      return this.isLogin() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_WRITER' : false;
    }

    getCurrentUsername(): string {
      if (this.isLogin()) {
        return JSON.parse(localStorage.getItem('currentUser')).username;
      }
    }

    getCurrentLanguage(): string {
      if (this.isLogin()) {
        return JSON.parse(localStorage.getItem('currentUser')).language;
      }
      return 'en';
    }

    setCurrentTheme(themeName: String) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser.theme = themeName;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

  setCurrentLanguage(languageName: String) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.language = languageName;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  getCurrentUserId(): number {
      return JSON.parse(localStorage.getItem('currentUser')).id;
  }

  setCurrentUsername(username: string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.username = username;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

    isCurrentUser(username: string): boolean {
      return this.getCurrentUsername() === username;
    }

    isCanEdit(username: string): boolean {
      return this.isAdmin() || this.isCurrentUser(username);
    }

    isCanAddInstruction(username: string): boolean {
      return this.isAdmin() || (this.isCurrentUser(username) && this.isWriter());
    }

}
