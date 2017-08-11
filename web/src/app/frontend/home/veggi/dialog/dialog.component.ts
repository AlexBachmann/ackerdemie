import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'tekkl-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {
	parent: any
	constructor(
		private el: ElementRef
	) { }

	ngOnInit() {
	}
	getMessage(){
		return this.el.nativeElement.innerHTML;
	}
	setParent(parent){
		this.parent = parent;
	}
}
