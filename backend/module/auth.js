const User = require('../model/User');

//Beléptetjük a frissen regisztrált felhasználót.
module.exports =
    (username, password, callBack) => {
        const authenticate = User.authenticate();
        authenticate(username, password, (err, result) => {
            if (err || !result) {
                return callBack({
                    error: "User not authenticated."
                });
            }
            //Sikeres belépés esetén visszaküldjük a felhasználó adatait.
            callBack(null, result);
        });
    };