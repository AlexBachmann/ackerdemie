import { Component, OnInit, Input, ContentChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { AckerComponent } from '../acker/acker.component';

@Component({
	selector: 'tekkl-veggi',
	templateUrl: './veggi.component.html',
	styleUrls: ['./veggi.component.sass']
})
export class VeggiComponent {
	@Input() type: string = ''
	@Input() size: string = ''
	@Input() state: string = ''
	@Input() position: number
	showDialog: boolean
	dialogIndex: number = undefined
	@ContentChildren(DialogComponent) dialogs: QueryList<DialogComponent>
	@Output() speak: EventEmitter<DialogComponent> = new EventEmitter();
	parent: AckerComponent
	constructor() { }

	ngAfterContentInit() {
		if(!this.dialogs) return;
		for(var dialog of this.dialogs.toArray()){
			dialog.setParent(this);
		}
	}

	setParent(parent){
		this.parent = parent;
	}

	handleClick(){
		if(this.state === 'bottom'){
			this.state = '';
			setTimeout(() => {
				if(!this.showDialog){
					this.state = 'bottom';
				}
			}, 5000);
		}else{
			if(this.hasDialog()){
				this.showNextDialog();
			}
		}
	}
	hasDialog(){
		return (this.dialogs && this.dialogs.length) ? true : false;
	}
	showNextDialog(){
		this.showDialog = true;
		if(this.dialogIndex === undefined){
			this.dialogIndex = 0;
		}else if(this.dialogIndex < (this.dialogs.length -1)){
			this.dialogIndex++;
		}else{
			this.dialogIndex = 0;
		}
		this.speak.emit(this.dialogs.toArray()[this.dialogIndex]);
		this.parent.handleDialog(this.dialogs.toArray()[this.dialogIndex], Number(this.position))
	}
	closeDialog(){
		this.showDialog = false;
	}
}
