const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');

router.get('/activities', function(req, res) {
  Activity.find().then(function(activities) {
    for (i in activities) {
      let a = activities[i];
      if (!a.url){
        a.url = '/api/activities/' + a._id
        Activity.update({
          url: a.url
      })
    }
  }
    res.json(activities);
  })
})

router.post('/activities', function(req, res) {
  Activity.insertMany
  ({
    title: req.body.title,
    // quantity: req.body.quantity,
    date: req.body.date
  });
  Activity.find().then(function(activities) {
    res.json(activities);
  })
})

router.get('/activities/:id', function(req, res) {
  Activity.find({_id: req.params.id}).then(function(activities) {
    res.json(activities);
  })
})

router.put('/activities/:id', function(req, res) {
    Activity.update({title: req.query.q}, function(err) {
      if(!err) {
        console.log('wow');
      } else {
        console.log('oh...');
      }
    })
  res.send('Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.');
})

router.delete('/activities/:id', function(req, res) {
  Activity.remove({ _id: req.params.id }, function(err) {
    if(!err) {
      console.log('great');
    } else {
      console.log('no good');
    }
});
  res.send('Delete one activity I am tracking. This should remove tracked data for that activity as well.');
})

router.post('/activities/:id/stats', function(req, res) {
  res.send('Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.');
})

router.delete('/stats/:id', function(req, res) {
  res.send('Remove tracked data for a day.');
})

module.exports = router;
