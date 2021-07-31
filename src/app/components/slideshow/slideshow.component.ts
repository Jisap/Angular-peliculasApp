//npm install swiper
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() moviesSlideshow:Movie[];      // Usamos Input para enviar datos de un componente padre (home) al hijo (slideshow)
  
  public mySwiper:Swiper;
  
  constructor() { }

  ngAfterViewInit():void{
    this.mySwiper = new Swiper('.swiper-container', {
      
      loop: true,
    });
     
  }

  ngOnInit(): void {
    //console.log(this.movies);
  }

  onSlideNext(){
    this.mySwiper.slideNext();
  }
  onSlidePrev(){
    this.mySwiper.slidePrev();
  }
}
