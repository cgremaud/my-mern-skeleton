import express from 'express'
import userCtrl from '../controllers/user.controller'

//"routes" are a term for one of the functions under the C in mvc.
//this still has "controllers" but they only get and return the data. 
//the routes here handle the requests and routing

const router = express.Router()

router.route('/api/users').get(userCtrl.list).post(userCtrl.create) //so this maps get requests at /api/users to the list() method on userCtrl and post to create()

router.route('/api/users/:userId').get(userCtrl.read).put(userCtrl.updates).delete(userCtrl.remove)

//this line means that any time a request is sent with a userId, the userById function is called before the function it's being routed to. 
//this then appends the user object onto the request object before passing it on using next().
router.param('userId', userCtrl.userById)

export default router