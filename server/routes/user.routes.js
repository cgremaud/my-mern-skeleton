import express from 'express'
import userCtrl from '../controllers/user.controller'

//"routes" are a term for one of the functions under the C in mvc.
//this still has "controllers" but they only get and return the data. 
//the routes here handle the requests and routing

const router = express.Router()

router.route('/api/users').get(userCtrl.list).post(userCtrl.create) //so this maps get requests at /api/users to the list() method on userCtrl and post to create()

router.route('/api/users/:userId').get(userCtrl.read).put(userCtrl.updates).delete(userCtrl.remove)

router.param('userId', userCtrl.userById)

export default router