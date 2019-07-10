import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data',
	templateUrl: './data.component.html',
	styles: []
})
export class DataComponent implements OnInit {
	forma: FormGroup;

	usuario = {
		nombrecompleto: {
			nombre: 'Jose',
			apellido: 'Barajas'
		},
		correo: 'jebarcha@gmail.com'
		// [ 'correr', 'leer', 'hacer yoga' ]
	};

	constructor() {
		console.log(this.usuario);

		this.forma = new FormGroup({
			nombrecompleto: new FormGroup({
				nombre: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
				apellido: new FormControl('', [ Validators.required, this.noHerrera ])
			}),
			correo: new FormControl('', [
				Validators.required,
				Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
			]),
			pasatiempos: new FormArray([ new FormControl('Correr', Validators.required) ]),
			username: new FormControl('', Validators.required, this.existeUsuario),
			password1: new FormControl('', Validators.required),
			password2: new FormControl('')
		});

		// this.forma.setValue(this.usuario);
		this.forma.controls['password2'].setValidators([ Validators.required, this.noIgual.bind(this.forma) ]);

		// this.forma.valueChanges.subscribe((data) => {
		// 	console.log(data);
		// });
		this.forma.controls['username'].statusChanges.subscribe((data) => {
			console.log(data);
		});
	}

	ngOnInit() {}

	agregarPasatiempo() {
		(<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required));
	}

	guardarCambios() {
		console.log(this.forma.value);
		console.log(this.forma);
		// this.forma.reset(this.usuario);
		// this.forma.reset({
		// 	nombrecompleto: {
		// 		nombre: '',
		// 		apellido: ''
		// 	},
		// 	correo: ''
		// });
		// this.forma.controls['correo'].setValue('nuevo@algo.com');
	}

	noIgual(control: FormControl): { [s: string]: boolean } {
		// console.log(this);
		const forma = this;
		if (control.value !== forma.controls['password1'].value) {
			return {
				noiguales: true
			};
		}
		return null;
	}
	noHerrera(control: FormControl): { [s: string]: boolean } {
		if (control.value === 'Herrera') {
			return {
				noherrera: true
			};
		}
		return null;
	}

	existeUsuario(control: FormControl): Promise<any> | Observable<any> {
		let promesa = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'strider') {
					resolve({
						existe: true
					});
				} else {
					resolve(null);
				}
			}, 3000);
		});
		return promesa;
	}
}
