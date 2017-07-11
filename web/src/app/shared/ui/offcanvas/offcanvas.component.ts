import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs/Observable';
import { OFFCANVAS_CLOSE } from './offcanvas.state';

@Component({
	selector: 'tekkl-offcanvas',
	templateUrl: './offcanvas.component.html',
	styleUrls: ['./offcanvas.component.sass']
})
export class OffcanvasComponent implements OnInit {
	state: Observable<boolean>
	constructor(
		private store: Store<AppState>,
		private router: Router
	) {
		this.state = store.select('offcanvas');
	}

	ngOnInit() {
		this.router.events.subscribe((event: NavigationStart) => {
 			if (event instanceof NavigationStart) {
 				this.store.dispatch({type: OFFCANVAS_CLOSE});
 			}
 		});
	}
	close(){
		this.store.dispatch({type: OFFCANVAS_CLOSE});
	}
}
