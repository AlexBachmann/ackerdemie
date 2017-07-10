<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;


class RegistrationFormType extends AbstractType {
	/**
	 * @var string
	 */
	private $class;

	/**
	 * @param string $class The User class name
	 */
	public function __construct($class){
		$this->class = $class;
	}
	/**
	 * {@inheritdoc}
	 */
	public function buildForm(FormBuilderInterface $builder, array $options){
		$builder
			->add('firstname', TextType::class, [
				'constraints' => [
					new NotBlank()
				]
			])
			->add('lastname', TextType::class, [
				'constraints' => [
					new NotBlank()
				]
			])
			->add('username', TextType::class, [
				'constraints' => [
					new NotBlank()
				]
			])
			->add('email', EmailType::class, [
				'constraints' => [
					new NotBlank(),
					new Email()
				]
			])
			->add('plainPassword', RepeatedType::class, [
				'type' => PasswordType::class,
				'constraints' => [
					new NotBlank(),
					new Length(8)
				]
			])
		;
	}
	/**
	 * {@inheritdoc}
	 */
	public function configureOptions(OptionsResolver $resolver){
		$resolver->setDefaults(array(
			'data_class' => $this->class
		));
	}
}
