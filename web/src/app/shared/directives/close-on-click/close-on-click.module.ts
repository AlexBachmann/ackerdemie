import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseOnClickDirective } from './close-on-click.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ CloseOnClickDirective ],
	exports: [ CloseOnClickDirective ]
})
export class CloseOnClickModule { }
