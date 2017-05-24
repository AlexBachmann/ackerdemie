<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\FacebookBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\DependencyInjection\Reference;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class TekklFacebookExtension extends Extension {
    public function load(array $configs, ContainerBuilder $container){
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $container
            ->getDefinition('tekkl_facebook.user_manager')
            ->addArgument($config['facebook_user_class']);

        $this->registerRegistrationConfirmationMailHelper($config, $container);
    }
    protected function registerRegistrationConfirmationMailHelper($config, ContainerBuilder $container){
        $mailHelper = $container->register('tekkl.facebook.helper.registration_confirmation_mail', 'Tekkl\\Bundle\\FacebookBundle\\Helper\\Mail\\RegistrationConfirmationMailHelper');
        $mailHelper->addArgument(new Reference('tekkl.mailer'));
        $mailHelper->addArgument(new Reference('tekkl.url.service'));
        $mailHelper->addMethodCall('setPasswordResetLinkTemplate', [$config['registration']['password_reset_link_template']]);
    }
}