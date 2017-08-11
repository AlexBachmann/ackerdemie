import { Component, OnInit, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { DialogComponent } from '../veggi/dialog/dialog.component';
import { VeggiComponent } from '../veggi/veggi.component';

@Component({
	selector: 'tekkl-acker',
	templateUrl: './acker.component.html',
	styleUrls: ['./acker.component.sass']
})
export class AckerComponent {
	dialog: DialogComponent
	showDialog: boolean
	dialogPosition: number
	@ContentChildren(VeggiComponent) veggis: QueryList<VeggiComponent>

	constructor() { }

	ngAfterContentInit() {
		for(var veggi of this.veggis.toArray()){
			veggi.setParent(this);
		}
	}
	handleDialog(dialog: DialogComponent, position: number){
		this.dialog = dialog;
		this.dialogPosition = position;
	}
	getDialogState(){
		var ret = this.dialog !== undefined ? 'active' : 'inactive';
		console.log(ret);
		return ret;
	}
	getDialogMessage(){
		return (this.dialog) ? this.dialog.getMessage() : '';
	}
	getDialogPositionClass(){
		var position = '';
		switch(this.dialogPosition){
			case 1:
				position = 'q1 left';
				break;
			case 2:
				position = 'q2 left';
				break;
			case 3:
				position = 'q3 left';
				break;
			case 4:
				position = 'q4 left';
				break;
			case 5:
				position = 'q1 right';
				break;
			case 6:
				position = 'q2 right';
				break;
			case 7:
				position = 'q3 right';
				break;
			case 8:
				position = 'q4 right';
				break;
		}
		return position;
	}
	closeDialog(){
		this.dialog = undefined;
	}
}
