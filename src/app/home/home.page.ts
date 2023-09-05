import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras, RouterLinkWithHref} from '@angular/router';
import { UserModel } from '../models/UserModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUserLogin } from '../models/IUserLogin';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  @ViewChild (IonCard, {read: ElementRef}) card: ElementRef <HTMLIonCardElement> | undefined;

  private animation: Animation;

  userInfoReceived: UserModel | undefined;
  idUserHtmlRouterLink: any;

  constructor( private animationCtrl: AnimationController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.animation = {} as Animation;
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['user'];
    // Si quiero obtener un valor por URL usando routerLink
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    // Obteniendo el ID podria buscar en algún arreglo o BD el usuario con el id
    console.log("Valor obtenido desde URL: ",this.idUserHtmlRouterLink);
  }


    //Animación ColorCard
    ngAfterViewInit(){
      if (this.card) {
        this.animation = this.animationCtrl
        .create()
        .addElement(this.card.nativeElement)
        .duration(1500)
        .iterations(Infinity)
        .direction('alternate')
        .fromTo('background', 'blue', 'var(--background)');
  
        this.animation.play();
      }
    }  
    
    play(){

      this.animation.play();
    }
  
    
  
    stop(){
      this.animation.stop();
    }



    goInfo(){
      let userInfoSend: NavigationExtras = {
        state: {
          user: this.userInfoReceived
        }
      }
      if(this.userInfoReceived?.type == 'USUARIO'){
        this.router.navigate(['/usuario'], userInfoSend)
      }else{
        this.router.navigate(['/admin'], userInfoSend)
    }
  }
    cerrarSesion(){
      this.router.navigate(['/login'])
    }
}
