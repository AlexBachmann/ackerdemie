/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule as TekklBrowserModule } from './shared/browser/browser.module';
import { Config } from './configuration.service';
import { AppRoutingModule } from './routing.module';
import { AuthenticationModule } from './shared/authentication/authentication.module';
import { AuthenticationService } from './shared/authentication/authentication.service';
import { NotificationService } from './shared/ui/notification/notification.service';
import { EventsModule } from './shared/events/events.module';
import { FacebookModule } from './shared/facebook/facebook.module';
import { FacebookService } from './shared/facebook/facebook.service';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		TekklBrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		AuthenticationModule,
		AppRoutingModule,
		EventsModule,
	],
	providers: [
		Config,
		/*
		 * The following services are registered at application root level and not
		 * via the modules they ship with, because those modules are also being imported
		 * by lazy loaded modules, which would cause those service to be reinstantitated 
		 * in those module's child injectors.
		 * See: https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-lazy-loaded-module-provider-visibility
		 */
		NotificationService,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
	