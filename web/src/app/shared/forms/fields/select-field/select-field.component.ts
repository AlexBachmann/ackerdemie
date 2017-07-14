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
	display: string
	opened: boolean = false
	focused: boolean = false
	_value: string
	_optionMap: Map<string, any> = new Map<string, string>()
	options: SelectOptionComponent[] = []
	optionIndex: number

	propagateChange = (_: any) => {};
	propagateTouch = () => {};

	ngAfterViewInit(){
		if(!this._optionMap.has(this.value)){
			this.value = '';
		}
		this.setDisplay();
	}
	@Input()
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

	registerOption(option: SelectOptionComponent){
		if(!this._optionMap.has(option.value)){
			this._optionMap.set(option.value, option.text);
			this.options.push(option);
		}
	}

	isRequired():boolean{
		return false
	}
	toggle(){
		this.opened ? this.close() : this.open();
	}
	open(){
		this.opened = true;
		if(this.value){
			for(var index = 0; index < this.options.length; index++){
				if(this.options[index].value == this.value){
					this.optionIndex = index;
					this.options[index].focused = true;
				}
			}
		}
	}
	close(){
		if(this.opened !== false){
			this.opened = false;
			this.propagateTouch();
		}
		this.optionIndex = undefined;
		this.resetOptionFocus();
	}
	onKeyPress(event){
		switch(event.key){
			case 'Enter':
				this.handleEnter();
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.handleArrowUp();
				break;
			case 'ArrowDown':
				event.preventDefault();
				this.handleArrowDown();
				break;
		}
	}
	private handleEnter(){
		if(!this.opened){
			this.open();
			return;
		}
		if(this.optionIndex !== undefined){
			var option = this.options[this.optionIndex];
			this.value = option.value;
		}
		this.close();
	}
	private handleArrowUp(){
		this.resetOptionFocus();
		if(this.optionIndex === undefined){
			this.optionIndex = this.options.length - 1;
		}else{
			(this.optionIndex == 0)? this.optionIndex = this.options.length -1 : this.optionIndex--;
		}
		this.setOptionFocus();
	}
	private handleArrowDown(){
		this.resetOptionFocus();
		if(this.optionIndex === undefined){
			this.optionIndex = 0;
		}else{
			(this.optionIndex == this.options.length -1)? this.optionIndex = 0 : this.optionIndex++;
		}
		this.setOptionFocus();
	}
	private resetOptionFocus(){
		for(var option of this.options){
			option.focused = false;
		}
	}
	private setOptionFocus(){
		var option = this.options[this.optionIndex];
		option.focused = true;
	}
}