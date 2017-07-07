/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, OnInit, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { SelectOptionComponent } from './select-option.component';
import { AbstractField } from '../abstract-field';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
	selector: 'tekkl-select-field',
	templateUrl: './select-field.component.html',
	styleUrls: ['./select-field.component.sass'],
	providers: [{ 
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => SelectFieldComponent),
		multi: true
	}]
})
export class SelectFieldComponent extends AbstractField implements ControlValueAccessor {
	@Input() label: string;

	private idCounter = 0;
	display: string
	opened: boolean = false
	_value: string
	_optionMap: Map<string, any> = new Map<string, string>();

	propagateChange = (_: any) => {};
	propagateTouch = () => {};

	ngAfterViewInit(){
		if(!this._optionMap.has(this.value)){
			this.value = '';
		}
		this.setDisplay();
	}
	get value(){
		return this._value;
	}
	set value(value: string){
		if(this._value != value){
			this._value = value;
			this.setDisplay();
			this.propagateChange(value);
		}
	}
	hasDisplay(){
		return (this.display !== undefined);
	}
	setDisplay(){
		if(this._optionMap.has(this.value)){
			this.display = this._optionMap.get(this.value);
		}else{
			this.display = undefined
		}
	}
	writeValue(value: any){
		this.value = value;
	}

	registerOnChange(fn: (_:any) => {}){
		this.propagateChange = fn;
	}

	registerOnTouched(fn: () => {}){
		this.propagateTouch = fn;
	}

	registerOption(value: string, text: string){
		this._optionMap.set(value, text);
	}

	isRequired():boolean{
		return false
	}
	toggle(){
		this.opened ? this.close() : this.open();
	}
	open(){
		this.opened = true;
	}
	close(){
		this.opened = false;
		this.propagateTouch();
	}
}