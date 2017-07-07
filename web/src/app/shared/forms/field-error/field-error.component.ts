/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, OnInit, Host, Optional, Inject } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractField } from '../fields/abstract-field';

@Component({
	selector: 'tekkl-field-error',
	templateUrl: './field-error.component.html',
	styleUrls: ['./field-error.component.sass']
})
export class FieldErrorComponent implements OnInit {
	@Input() control: AbstractControl;
	@Input() type: string;
	@Input() message: string;
	
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

}
