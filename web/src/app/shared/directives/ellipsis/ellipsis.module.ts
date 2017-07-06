import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisDirective } from './ellipsis.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ EllipsisDirective ],
	exports: [ EllipsisDirective ]
})
export class EllipsisModule { }
