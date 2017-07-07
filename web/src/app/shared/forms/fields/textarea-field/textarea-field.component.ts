/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractField } from '../abstract-field';

@Component({
	selector: 'tekkl-textarea-field',
	templateUrl: './textarea-field.component.html',
	styleUrls: ['./textarea-field.component.sass'],
	providers: [{ 
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => TextareaFieldComponent),
		multi: true
	}]
})
export class TextareaFieldComponent extends AbstractField implements ControlValueAccessor {
	@Input() label: string;
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