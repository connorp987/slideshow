<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Tyler Craig <craigta1 at appstate dot edu>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace slideshow\Controller\Session;

use Canopy\Request;
use slideshow\Factory\SessionFactory;

class Logged extends Base
{
    /**
     * @var slideshow\Factory\SessionFactory
     */
    protected $factory;

    protected function putCommand($request)
    {
        $this->factory->put($request);
        return true;
    }

    protected function viewJsonCommand($request)
    {
        return $this->factory->get($request);
    }

}