// Servicio de Firebase no lo toquen

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  constructor(private firestore: AngularFirestore) { }

  getCosts(): Observable<any[]> {
    return this.firestore.collection('extracost').valueChanges();
  }
}
