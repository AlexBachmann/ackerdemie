<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\AppBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\UnexpectedTypeException;

/**
 * Transforms between a UserInterface instance and a username string.
 *
 * @author Thibault Duplessis <thibault.duplessis@gmail.com>
 */
class DateSelectTransformer implements DataTransformerInterface
{
    /**
     * Transforms a DateTime object to a date array
     *
     * @param DateTime|null $date DateTime instance
     *
     * @return array|null date array
     *
     * @throws UnexpectedTypeException if the given value is not a Team instance
     */
    public function transform($date)
    {
        if (null === $date) {
            return null;
        }

        if (!$date instanceof \DateTime) {
            throw new UnexpectedTypeException($value, 'DateTime');
        }

        return [
        	'day' => $date->format('d'),
        	'month' => $date->format('m'),
        	'year' => $date->format('Y')
        ];
    }

    /**
     * Transforms a date array into a DateTime instance.
     *
     * @param array $date date array
     *
     * @return DateTime
     *
     * @throws UnexpectedTypeException if the given value is not a string
     */
    public function reverseTransform($date)
    {
        if (null === $date) {
            return null;
        }

        if (!is_array($date) || !isset($date['year']) || !isset($date['month']) || !isset($date['day'])) {
            throw new UnexpectedTypeException($date, 'array');
        }
        $dateTime = new \DateTime($date['year'] . '-' . $date['month'] . '-' . $date['day']);
        return $team;
    }
}