/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function (req, res) {
    console.log('Backend signup');
    var Passwords = require('machinepack-passwords');

    //Encrypt Passwords
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: function (err) {
        return res.negotiate(err);
      },
      success: function (encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function (err) {
            return res.negotiate(err);
          },
          success: function (gravatarUrl){
            User.create({
              name: req.param('name'),
              email: req.param('email'),
              password: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {
                console.log('Error: '+ err);
                return res.negotiate(err);
              }

              //SESSION VAR
              console.log('User Created');

              res.json({
                id: newUser.id
              });
            })
          }
        })
      }
    })
  }
};

