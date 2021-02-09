const db = require('../models');

db.player.create({
    name: "James Sinkler",
    number: 1,
    position: 'Lead Instructor',
    college: null
})
.then(createdPlayer => {
    // cleans object up
    const cleanPlayer = createdPlayer.get(); // get back an object instead of the previous dataValues object in addition
    console.log(typeof cleanPlayer, cleanPlayer);
});