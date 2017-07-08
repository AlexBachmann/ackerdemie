/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, OnInit, Host, Optional, Inject } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { AbstractField } from '../fields/abstract-field';

@Component({
	selector: 'tekkl-field-error',
	templateUrl: './field-error.component.html',
	styleUrls: ['./field-error.component.sass']
})
export class FieldErrorComponent implements OnInit {
	@Input() control: AbstractControl | FormGroup;
	@Input() type: string;
	@Input() message: string;
	@Input() flat: boolean = false;
	
	private host?: AbstractField

	constructor(@Optional() @Host() @Inject(NG_VALUE_ACCESSOR) private hosts) {
		if(hosts && hosts.length){
			this.host = hosts[0];
		}
	}

	ngOnInit() {
		if(!this.control){
			if(this.host && this.host.getFormControl){
				this.control = this.host.getFormControl();
			}
		}
	}
	hasError(type: string){
		if(this.control.hasError(type)) return true;

		if(this.control instanceof FormGroup && this.control.controls && !this.flat){
			var errors = this.getChildErrors(this.control, type);
			if(errors.length) return true;
		}
		return false;
	}
	private getChildErrors(group: FormGroup, type: string){
		var errors = [];
		for(var key in group.controls){
			var control = group.controls[key];
			if(control.hasError(type)){
				errors.push(control.getError(type));
			}
			if(control instanceof FormGroup){
				errors.concat(this.getChildErrors(control, type));
			}
		}
		return errors;
	}
}
