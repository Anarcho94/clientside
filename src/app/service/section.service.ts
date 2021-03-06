import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Step} from '../model';
import {environment} from '../../environments/environment';

@Injectable()
export class SectionService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${environment.serverUrl}instructions/getAllCategories`);
  }

  getSteps() {
    return this.http.get<Step[]>(`${environment.serverUrl}instructions/getAllSteps`);
  }
}
