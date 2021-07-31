import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';// Cada vez que un observable emite un valor ejecuta un código
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = "https://api.themoviedb.org/3"
  private carteleraPage = 1;
  public cargando: boolean  = false;

  constructor(private http:HttpClient) { }

  get params(){
    return {
      api_key: '******************************',
      language:'es - ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1
  }

  getCartelera():Observable<Movie[]>{  //Este método devuelve un observable tipo Movie[] 
                                       
    if(this.cargando) {  // Si cargando es true
      return of([]);     // no se devolverá nada, evitamos así peticiones repetidas. 
    }

    this.cargando = true

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{  // La petición devuelve un CarteleraResponse
      params: this.params
    }).pipe(                                                         // La pasamos por un pipe para transformarla
      map((resp)=> resp.results),                                    // Con .map obtenemos results que es un movie[].
      tap( ()=> {                                                    // Con tap por cada observable recibido realizamos una optimizacion
        this.carteleraPage += 1                                      // Cada vez que se llame este servicio el nº de la página se incrementará en 1
        this.cargando = false;
      })
    )
  }

  buscarPeliculas(texto:string):Observable<Movie[]>{                          // Estp es lo que necesitamos (Movie[])

    const params = { ...this.params, page:'1', query: texto };  // Desestructuramos y metemos el query=texto y solo usamos una página para los rdos
    
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{  // La respuesta de la api es tipo carteleraResponse
      params
    }).pipe(
      map((resp)=>resp.results),                                              // y con .map seleccionaremos del observ carteletaResponse
    )                                                                         // el results que son tipo Movie[] 
  }

  getPeliculaDetalle(id:string){

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{
      params: this.params
    }).pipe(
      catchError( err => of(null))                                            // Si hay error enviamos un null
    )
  }

  getCast(id: string):Observable<Cast[]> {                                          // Esto es lo que necesitamos (cast[])                                   

    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {  // La respuesta de la Api es tipo CreditResponse
      params: this.params
    }).pipe(
      map( resp => resp.cast),                                              // Con .map seleccionamos de CreditResponse el cast tipo cast[]  
      catchError( err => of([]))                                            // Si hay error enviamos un []
    );
  }
}
