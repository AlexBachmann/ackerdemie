/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 **/

 import { Injectable } from '@angular/core';
 import { Router, NavigationStart, NavigationEnd } from '@angular/router';
 import { DocumentRef } from '../browser/document-ref.service';
 import { WindowRef } from '../browser/window-ref.service';

 @Injectable()
 export class RouterScrollService {
 	private lastRoute: string;
 	public restoreScrollPosition: boolean = false;
 	private scrollPos: {} = {};

 	constructor(
 		private router: Router,
 		private documentRef: DocumentRef,
 		private windowRef: WindowRef
 		){}
 	registerEvents(){
 		this.router.events.subscribe((event: NavigationStart | NavigationEnd) => {
 			if (event instanceof NavigationStart) {
 				this.saveScroll();
 				this.lastRoute = this.router.url;
 			}
 			if(event instanceof NavigationEnd){
 				if(this.restoreScrollPosition){
 					this.resolveScroll();
 				}else{
 					this.scrollTo(0);
 				}
 				this.restoreScrollPosition = false;
 			}
 		});
 	}
 	saveScroll() {
 		let position = Math.floor(this.windowRef.nativeWindow.pageYOffset || this.documentRef.nativeDocument.documentElement.scrollTop || this.documentRef.nativeDocument.body.scrollTop || 0);
 		this.scrollPos[this.router.url] = position;
 	}
 	public resolveScroll() {
 		var position = this.scrollPos[this.router.url] ? this.scrollPos[this.router.url] : 0;
 		this.scrollTo(position);
 	}

 	public scrollTo(position) {
 		this.documentRef.nativeDocument.body.scrollTop = position;
 	}
 }