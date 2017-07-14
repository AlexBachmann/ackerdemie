/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, forwardRef } from '@angular/core';
import { AbstractField } from '../abstract-field';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'tekkl-checkbox-field',
	templateUrl: './checkbox-field.component.html',
	styleUrls: ['./checkbox-field.component.sass'],
	providers: [{ 
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => CheckboxFieldComponent),
		multi: true
	}]
})
export class CheckboxFieldComponent extends AbstractField implements ControlValueAccessor {
	@Input() value: string | boolean = true
	@Input() label: string
	@Input() multiple: string | boolean | undefined

	propagateChange = (_: any) => {};
	propagateTouch = () => {};
	
	ngOnInit() {
		this.multiple = (typeof(this.multiple) === 'undefined') ? false : true;
	}
	toggle($event){
		// Don't toggle if user clicked on an anchor link within the label
		if($event.target.nodeName == 'A') return;
		if(this.isChecked()){
			this.uncheck();
		}else{
			this.check();
		}
		this.propagateChange(this.getFormControlValue());
		this.propagateTouch();
	}
	writeValue(value: string){
		return;
	}
	registerOnChange(fn: (_:any) => {}){
		this.propagateChange = fn;
	}
	registerOnTouched(fn: () => {}){
		this.propagateTouch = fn;
	}
	private getFormControlValue(){
		var value = this.getFormControl().value;
		if(this.multiple){
			if(typeof(value) == 'string'){
				throw new Error('The value of a checkbox with the attribute \'multiple\' must be an array');
			}
			if(!value || value.length === undefined){
				value = [];
			}
		}
		return value;
	}
	private check(){
		if(this.isChecked()) return;
		if(this.multiple){
			var values = this.getFormControlValue();
			if(values.indexOf(this.value) < 0){
				values.push(this.value);
			}
			this.getFormControl().setValue(values);
		}else{
			this.getFormControl().setValue(this.value);
		}
	}
	private uncheck(){
		if(!this.isChecked()) return;
		if(this.multiple){
			var values = this.getFormControlValue();
			var index = values.indexOf(this.value);
			if(index >= 0){
				values.splice(index, 1);
			}
			this.getFormControl().setValue(values);
		}else{
			this.getFormControl().setValue(null);
		}
	}
	isChecked(){
		var values = this.getFormControlValue();
		if(this.multiple){
			return (values.indexOf(this.value) >= 0);
		}else {
			return values === this.value;
		}
	}
}
