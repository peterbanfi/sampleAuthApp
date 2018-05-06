const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../module/auth');


/* GET users listing. */
router.get('/', function (req, res, next) {
  //res.send(req.body);
  User.find({}, (err, user) => {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
});

router.get('/find/:id', function (req, res, next) {
  User.findById(req.params.id)
    .then(userFound => {
      if (!userFound) {
        return res.status(404).end();
      }
      return res.status(200).json(userFound)
    })
    .catch(err => next(err));
});

router.delete('/delete/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id)
    .then(() => {

      res.status(204).end();
    })
    .catch(err => {
      return res.status(200).send(err)
    });
});


//6. Register new user.
/*       //Ezeket pedig visszaküldjük.
        delete req.body.password;
        req.body._id = newUser._id;
        res.json(req.body);
//Ez ugyan az mint felül:
        res.json({
          _id: newUser._id,
          username: req.body.username,
          email: req.body.email,
          address: req.body.address
        }); */

router.post("/register", (req, res, next) => {
  // Registráljuk az új felhalsználót, a post body adatai alapján
  User.register({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address
    },
    req.body.password,
    function (err, newUser) {
      if (err) {
        // Regisztrációs hiba esetén.
        return res.json({
          error: "Bad registration data."
        });
      }
      //Ha sikeresen regisztált:
      auth(req.body.username, req.body.password, (err) => {
        if (err) {
          return res.json(err);
        }
        //Ezeket pedig visszaküldjük.
        /* delete req.body.password;
        req.body._id = newUser._id; */
        res.json({
          "success": "Registration Complete!"
        });
      });
    }
  );
});

//Felhasználó beléptetése
router.post('/login', (req, res, next) => {
  auth(req.body.username, req.body.password, (err, user) => {
    if (err) {
      return res.json(err);
    }

    res.json({
      user: user.username
    });
  })
});

module.exports = router;