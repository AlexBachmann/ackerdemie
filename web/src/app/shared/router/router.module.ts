/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterScrollService } from './router-scroll.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [ RouterScrollService ],
	declarations: []
})
export class RouterModule { }
