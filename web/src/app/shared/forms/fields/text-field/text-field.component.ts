/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractField } from '../abstract-field';

@Component({
	selector: 'tekkl-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.sass'],
	providers: [{ 
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => TextFieldComponent),
		multi: true
	}]
})
export class TextFieldComponent extends AbstractField implements ControlValueAccessor {
	@Input() label: string;
	@Input() type: string = 'text';
	@ViewChild('nativeInput') inputRef: ElementRef;
	
	propagateChange = (_: any) => {};
	propagateTouch = () => {};

	hasValue(){
		return this.value ? true : false
	}
	get value(): string{
		return this.inputRef.nativeElement.value;
	}
	set value(value: string){
		this.inputRef.nativeElement.value = value;
		this.propagateChange(value);
	}
	writeValue(value: string){
		if(value !== undefined){
			this.value = value;
		}
	}
	registerOnChange(fn: (_:any) => {}){
		this.propagateChange = fn;
	}
	registerOnTouched(fn: () => {}){
		this.propagateTouch = fn;
	}
}
