/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/

import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export class AbstractField {
	@Input() formControl;

	getFormControl(){
		return this.formControl;
	}
	getFormControlName(){
		var name = '';
		if(this.formControl.parent){
			for(var key in this.formControl.parent.controls){
				if(this.formControl.parent.controls[key] == this.formControl){
					name = key;
				}
			}
		}
		return name;
	}
}