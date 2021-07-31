import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { PeliculasPosterGridComponent } from '../../components/peliculas-poster-grid/peliculas-poster-grid.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[]=[];           // Definimos un array vacio de peliculas para el body 
  public moviesSlideshow: Movie[]=[];  // Definimos otro array de películas para el slideShow

  @HostListener('window:scroll', ['$event'])    // Escucharemos el evento scroll
  
  onScroll(){                                   // cuando se haga scroll se disparará esta función 

    const pos = (document.documentElement.scrollTop || document.body.scrollTop)+1300;  // obtenemos el scrolltop -> establece el nº de pixels que
                                                                                       // el elemento ha sido desplazado hacia arriba
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight); // Obtenemos el scrollheigth -> establece la altura del 
                                                                                       // contenido de un elemento incluyendo partes no visibles

    if (pos > max){                                                                    // Si la posición en la que me encuentro es > al espacio máximo 
      if(this.PeliculasService.cargando) { return }                                    // (Si estamos cargando las películas no hacemos peticiones)
      this.PeliculasService.getCartelera()                                             // que tengo, recargo las peticiones -> pag+1
      .subscribe({
        next: movies => {this.movies.push(...movies)}                                  // La pag+1 se introduce en movies[]
      })
    } 
  }

  constructor(private PeliculasService: PeliculasService) {} // Inyectamos el servicio de peliculas para obtener la cartelera

  ngOnInit(): void {

    this.PeliculasService.getCartelera()                     // Llamamos al servicio  (forma antigua)
      // .subscribe(resp => {
      //   console.log(resp);
      //   this.movies = resp.results;
      //   this.moviesSlideshow = resp.results
      // })
      .subscribe({                                          // Nos subscribimos al observable
        next: movies => { 
          this.movies = movies ,                            // obtenemos la respuesta tipo movies[] y la metemos en el array movies 
          this.moviesSlideshow = movies },                  // y lo mismo para el slideshow
        error:(err:any)=>{console.log(err)},
        complete:()=>{console.log(this.movies)} 
      })    
  }
    
    ngOnDestroy() {
      this.PeliculasService.resetCarteleraPage();           // reinicializamos el componente 
    }
}
