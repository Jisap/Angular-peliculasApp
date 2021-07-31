import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(private router:Router) { } // Utilizamos Router para navegar al apartado película en detalle

  ngOnInit(): void {

  }

  onMovieClick(movie:Movie){
    console.log(movie);
    this.router.navigate(['pelicula', movie.id]); //Cuando se haga click en la película nos llevará a la ruta: 'pelicula/id'
  }
}
