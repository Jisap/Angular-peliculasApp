import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto:string = '';
  public movies: Movie[] = [];

  constructor(private ActivatedRoute: ActivatedRoute,          // Para obtener los valores del url usamos activatedRoute, un observable
              private peliculasService: PeliculasService) { }  // Inyectamos el servicio de busqueda de películas 

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe({
      next: params => { 
        this.texto = params.texto,   //igualamos texto con el query para usarlos en el html
        this.peliculasService.buscarPeliculas(params.texto).subscribe(movies => this.movies = movies)},
      error: (err: any) => { console.log(err) }            
    })

  }

}
