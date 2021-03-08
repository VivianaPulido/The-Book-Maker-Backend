const {Router} = require('express');
const router  = new Router();
const mongoose= require('mongoose')
const User= require('../models/User.model')
const bcrypt= require('bcrypt')
const saltRounds= 10


//signup
router.post('/signup', async (req, res, next) => {
  console.log("entra a la ruta")
  const {username, email, password}= await req.body
  console.log({username, email, password})

  //PROBLEMA: las validaciones no dejan pasar lo que no está en orden a la DB pero no se renderizan los errores en el front

  if (!username || !email || !password) {
    res.json('/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .json('/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  try{
    const genSaltResult= await bcrypt.genSalt(saltRounds);
    const hashPassword= await bcrypt.hash(password, genSaltResult)
  
    const user= await User.create({
      username: username,
      email: email,
      password: hashPassword   
    })
    //req.session.currentUser = user //esto se sigue haciendo así o que
    res.redirect('/')
  }
  catch(error) { //para este catch tampoco se si hacer los res renders o como es
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('users/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
           errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
    }
  }
});

//Post login
router.post('/login', async(req, res, next) => {
  const {email, password} = await req.body

  try{
    
      const userLogin =  await User.findOne({email})
      console.log(userLogin)
      if (!userLogin) {
          res.json({errorMessage:'El usuario no fue encontrado, por favor verifica la información.'})
          return;
      } else if (bcrypt.compareSync(password,userLogin.password)) {
            req.session.currentClient = userLogin;
            res.redirect('http://localhost:3000/login');
      } else {
            res.json({errorMessage:'Contraseña incorrecta, por favor verifica.'})
        }    
      
    } catch (error) {
    next(error);
}
})

//logout
router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router;