import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
        .subscribe(
          numero => console.log('Subs ', numero),
          error => console.error('Error en el obs(2 veces)'),
          () => console.log('El observador termino')
    );
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
    
  }

  regresaObservable(): Observable<any> {

    return new Observable(observer => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;

        let salida = {
          valor: contador
        };

        // tslint:disable-next-line:no-trailing-whitespace
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {

        //   observer.error('Ayuda');
        // }

      }, 500);
    }).retry(2)
      .map((resp: any) => {
        return resp.valor;
      }).filter((valor, index) => {
        // console.log('Filter', valor, index);
        if ((valor % 2) === 1) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }


      });

  }

}
