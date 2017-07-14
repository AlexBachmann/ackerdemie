/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { Component, Input, OnInit, Optional, Host } from '@angular/core';
import { SelectFieldComponent } from './select-field.component';

@Component({
	selector: 'tekkl-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.sass']
})
export class SelectOptionComponent {
	@Input() value: string;
	@Input() text: string;
	@Input() selected: string;
	focused = false

	constructor(@Host() private select: SelectFieldComponent ){
	}
	ngOnInit(){
		this.select.registerOption(this);
		if(this.selected !== undefined){
			this.select.value = this.value;
		}
	}
	onSelectOption(){
		this.select.value = this.value;
		this.select.close();
	}
	isHidden():boolean {
		return (this.select.isRequired() && !this.value)
	}
}