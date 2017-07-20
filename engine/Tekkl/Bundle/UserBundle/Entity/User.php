<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="tekkl_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=180)
     */
    protected $firstname;

    /**
     * @ORM\Column(type="string", length=180)
     */
    protected $lastname;

    public function __construct()
    {
        parent::__construct();
    }

    public function getFirstname(){
        return $this->firstname;
    }

    public function setFirstname($firstname){
        $this->firstname = $firstname;
    }

    public function getLastname(){
        return $this->lastname;
    }

    public function setLastname($lastname){
        $this->lastname = $lastname;
    }

    public function getName(){
        return trim($this->firstname . ' ' . $this->lastname);
    }

    public function setName($name){
        $parts = explode(' ', $name, 2);
        $this->setFirstname($parts[0]);
        if(isset($parts[1])){
            $this->setLastname($parts[1]);
        }else{
            $this->setLastname('');
        }
    }

    public function getPublicData(){
        return [
            'id' => $this->getId(),
            'username' => $this->getUsername(),
            'firstname' => $this->getFirstname(),
            'lastname' => $this->getLastname(),
            'email' => $this->getEmail(),
            'roles' => $this->getRoles()
        ];
    }
}
