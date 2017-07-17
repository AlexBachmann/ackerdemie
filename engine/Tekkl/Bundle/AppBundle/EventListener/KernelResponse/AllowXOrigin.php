<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\EventListener\KernelResponse;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class AllowXOrigin {
	public function __construct($origin = '*', $pathPattern = null, $allowedHeaders = null, $allowedMethods = null){
		$this->origin = $origin;
		$this->pathPattern = $pathPattern;
		$this->allowedHeaders = $allowedHeaders;
		$this->allowedMethods = $allowedMethods;
	}
	public function onKernelResponse(FilterResponseEvent $event){
		$response = $event->getResponse();
		$request = $event->getRequest();

		if($this->pathPattern){
			$uri = $request->getRequestUri();
			$pattern = '#' . $this->pathPattern . '#';
			if(!preg_match($pattern, $uri)){
				return;
			}
		}
		$response->headers->set('Access-Control-Allow-Origin', $this->origin);
		$response->headers->set('Access-Control-Expose-Headers', $this->allowedHeaders);
		$response->headers->set('Access-Control-Allow-Methods', $this->allowedMethods);
	}
}