  
const sequelize = require('../config/connection');
const router = require('express').Router();
const { Student, Teacher, Behavior, BehaviorNote } = require('../models');
// const withAuth = require('../utils/auth');

// route to show all students
router.get('/', async (req, res) => {
  Teacher.findAll({
    attributes: ['id', 'teacherName', 'grade', 'email'],
    include: [
      {
        model: Student,
        attributes: ['id','student_name', 'student_grade']

      }
    ]
  }).then (studentTable => {
    const students = studentTable.map(student => student.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });   

  });


    


router.get('/teacher/:id', async (req,res)=> {
 try{
    const teacherTable = await Teacher.findByPk(req.params.id);
    const teacher = teacherTable.get({ plain: true });

    res.render('profile', {
  ...teacher,
    })
  
} catch {
    res.status(500).json(err);  
}
});

router.get('/student', async (req, res) => {
  try {
    const studentTable = await Student.findAll({}).catch((err) => { 
      res.json(err);
    });
    const students = studentTable.map((student) => student.get({ plain: true }));
      res.render('students', {
      ...students,
      })
  } catch {
      res.status(500).json(err);  
  }
});


router.get('/student/:id', async (req, res) => {
    try {
        const studentTable = await Student.findByPk(req.params.id);
        const student = studentTable.get({ plain: true });

        res.render('students', {
        ...student,
        })
    } catch {
        res.status(500).json(err);  
    }
});

router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const teacherTable = await Teacher.findAll({}).catch((err)=> {

    });

    const teacher = teacherTable.get({ plain: true });
    console.log(teacher)
    res.render('profile', {
      ...teacher,
      // logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Trying to get behaviors to show on student page
// router.get('/student/:id', async (req, res) => {
//   const behaviorData = await Behavior.findByPk(re.params.id).catch((err) => { 
//       res.json(err);
//     });
//     const behaviors = behaviorData.map((behavior) => behavior.get({ plain: true }));
//     res.render('students', { behavior });
//     });


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/students');
      return;
    }
  
    res.render('login');
  });

module.exports = router;

