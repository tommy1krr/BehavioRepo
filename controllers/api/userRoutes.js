const router = require('express').Router();
const { Student, Project, User } = require('../../models');
//const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    //find all users
    try{
      const userData = await User.findAll({
        //include: students?
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
    });

router.get('/:id', async (req, res) => {
    // find one user by its `id` value

    try {
      const userData = await User.findByPk(req.params.id, {
        //include: students?
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new user
   try {
    const userData = await User.create(req.body);
     res.status(200).json(userData);
   } catch (err) {
    res.status(400).json(err);
 }
 });

 router.put('/:id', (req, res) => {
    // update a User by its `id` value
    User.update(
    //   {
    //    id:req.body.id,
    //    category_name: req.body.category_name 
    //   },
    //   {
    //     where: {
    //       id: req.params.id
    //     }
    //   }
    )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));
  });

  router.delete('/:id', async (req, res) => {
    // delete a User by its `id` value
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  

