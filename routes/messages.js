const express = require("express");

const Messages = require("../models/message");

const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");

const router = new express.Router();


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
 router.get('/:id', ensureLoggedIn, async function(req, res, next)
{
    try 
    {
        let id = req.body.id
        const messages = await Messages.get(id);
        return res.json(messages)
    } 
    catch (err) 
    {
        return next(err);
    } 

});



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/', async function(req, res, next)
{
    try 
    {
        let {body,to_username,from_username} = req.body

        const message = await Messages.create({from_username, to_username, body});
        return res.json({message})
    } 
    catch (err) 
    {
        return next(err);
    } 

});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post('/:id/read', async function(req, res, next)
{
    try 
    {
        let id = req.body.id
        const message = await Messages.all(id);
        return res.json({message})
        
    } 
    catch (err) 
    {
        return next(err);
    } 

});
