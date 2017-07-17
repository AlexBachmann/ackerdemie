<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Validator\Constraints\NotBlank;

use Tekkl\Bundle\AppBundle\Form\DataTransformer\DateSelectDataTransformer;


class DateSelectFormType extends AbstractType {
	
	private $transformer;

	public function __construct(DateSelectDataTransformer $transformer){
		$this->transformer = $transformer;
	}
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        	->add('day', IntegerType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('month', IntegerType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('year', IntegerType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->addModelTransformer($this->transformer);
        ;
    }
}