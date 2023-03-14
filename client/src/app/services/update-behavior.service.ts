import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateBehaviorService {
  update_title$ = new BehaviorSubject<string>('');
  update_description$ = new BehaviorSubject<string>('');
  update_id$ = new BehaviorSubject<string>('');
  update_show$ = new BehaviorSubject<boolean>(false);

  constructor() {}
}
