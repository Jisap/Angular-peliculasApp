import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(private ActivatedRoute: ActivatedRoute,       // Para obtener los valores del url usamos activatedRoute, un observable
              private PeliculasService: PeliculasService,   // Inyectamos el servicio de detalles de la película
              private location: Location,                   // Inyectamos el objeto location que nos da información sobre las url del usuario
              private router: Router) {                     // Inyectamos las rutas para la gestión de la salida al error           

   }

  ngOnInit(): void {

    const id = this.ActivatedRoute.snapshot.params.id;  // Obtenemos el id de la película por los params del url (movie.id)
   
    combineLatest([                                     // Combina observables y devuelve un array con sus respuestas cuando todos las emiten

      this.PeliculasService.getPeliculaDetalle(id),
      this.PeliculasService.getCast(id)

    ]).subscribe( ([movie, cast ]) => {               // Desestructuramos del array las respuestas
      
      if (!movie) {
        this.router.navigateByUrl('/home')            // Si la película no existe -> Null -> ('/home') 
        return
      }
      this.pelicula = movie;                          // y si si existe mostramos los detalles de la película

      this.cast = cast.filter(actor => actor.profile_path != null)  // Obtenemos el cast y rellenamos con él el public cast
    })                                                              // pero lo filtramos para evitar los rdos null sin imagen.



    // this.PeliculasService.getPeliculaDetalle(id).subscribe({
    //   next: movie => {
    //     if(!movie){ 
    //       this.router.navigateByUrl('/home')            // Si la película no existe -> Null -> ('/home') 
    //         return }          
    //     this.pelicula = movie;                          // y si si existe mostramos los detalles de la película
    //   }
    // });

    // this.PeliculasService.getCast(id).subscribe({
    //   next: cast => this.cast = cast.filter(actor => actor.profile_path != null)     // Obtenemos el cast y rellenamos con él el public cast
    // })                                                                               // pero lo filtramos para evitar los rdos null sin imagen.
  }

  onRegresar(){
    this.location.back();
  }
}
