import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  buscarPelicula(texto:string){

    texto = texto.trim();
    if(texto.length === 0){                    // Si el texto sin espacios es igual a 0 no devuelve nada
      return
    }
  
    this.router.navigate(['/buscar', texto])  // Si el texto tiene contenido, este se lleva a la ruta '/buscar' con ese value ( texto )
  
  }


}
