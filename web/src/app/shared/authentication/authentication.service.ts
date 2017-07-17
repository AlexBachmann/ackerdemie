/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user.entity';
import { UserStorage } from './user-storage/user-storage.service';
import { JwtStorage } from './jwt-storage/jwt-storage.service';
import { RefreshTokenStorage } from './refresh-token-storage/refresh-token-storage.service';

@Injectable()
export class AuthenticationService {
	private user: User = null
	private redirectUrl: string = '/';
	constructor(
		private userStorage: UserStorage,
		private jwtStorage: JwtStorage,
		private refreshTokenStorage: RefreshTokenStorage,
		private http: Http
	){}
	getUser(): User{
		return this.userStorage.getUser();
	}
	isLoggedIn():boolean{
		var user = this.getUser();
		return (user && user.id) ? true : false;
	}
	setRedirectUrl(url:string){
		this.redirectUrl = url;
	}
	getRedirectUrl():string{
		return this.redirectUrl;
	}
	resetRedirectUrl(){
		this.redirectUrl = '/';
	}
	refreshAuthToken(){
		if(this.jwtStorage.getJwtToken() && this.refreshTokenStorage.getRefreshToken()){
			this.http.post('/api/token/refresh', null)
				.subscribe((res) => {
					console.log(res);
				}, (err) => {
					console.log(err);
				});
		}
	}
}