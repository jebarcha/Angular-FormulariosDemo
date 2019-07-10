import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-template',
	templateUrl: './template.component.html',
	styles: [
		`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `
	]
})
export class TemplateComponent implements OnInit {
	usuario = {
		nombre: null,
		apellido: null,
		email: null,
		pais: 'MEX',
		sexo: 'Hombre',
		acepta: false
	};

	paises = [
		{
			codigo: 'MEX',
			nombre: 'Mexico'
		},
		{
			codigo: 'CRI',
			nombre: 'Costa Rica'
		},
		{
			codigo: 'ESP',
			nombre: 'Espana'
		}
	];

	sexos: string[] = [ 'Hombre', 'Mujer', 'Sin Definir' ];

	constructor() {}

	ngOnInit() {}

	guardar(forma: NgForm) {
		console.log('ngForm', forma);
		// console.log('Valor', forma.value);
		// console.log('objeto', this.usuario);
	}
}
