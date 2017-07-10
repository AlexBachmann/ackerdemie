/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, HostListener } from '@angular/core';
import { Registry } from './lib/utils/registry';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './shared/state/app.state';
import { RouterScrollService } from './shared/router/router-scroll.service';

@Component({
	selector: '[app-root]',
	templateUrl: './app.component.html',
	host: {
		'[class.offcanvas-open]' : 'offCanvasState' 
	}
})
export class AppComponent {
	offCanvasState: boolean;
	constructor(
		private store: Store<AppState>,
		private routerScrollService: RouterScrollService
	){
		this.store.select('offcanvas').subscribe((state: boolean) => {
			this.offCanvasState = state;
		});
	}

	ngOnInit(){
		this.routerScrollService.registerEvents();
	}
	@HostListener('window:popstate', ['$event'])
	public onPopState(event) {
		this.routerScrollService.restoreScrollPosition = true;
	}
}