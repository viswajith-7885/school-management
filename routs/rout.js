const express =require('express');
const router =express.Router();
const usemodel =require('../models/users')

router.get('/',async(req,res)=>{
   const students = await usemodel.find()
    res.render('home',{ title:"home page",students})
});
router.get('/form',(req,res)=>{
    res.render('form');
})
router.post('/form',async(req,res)=>{
    const firstname =req.body.firstname
    const lastname =req.body.lastname
    const birthday =req.body.birthday
    const email =req.body.email
    const phone = req.body.phone
    const choseoption =req.body.choseoption
    const image =req.file.filename
    console.log(image);
    const model =new usemodel({
        firstname:firstname,
        lastname:lastname,
        birthday:birthday,
        email:email,
        phone:phone,
        choseoption:choseoption,
        image:image
    })
    await model.save().then(result=>{
        res.redirect('/')
        console.log(result);
    })
})
router.get('/view/:id',async(req,res)=>{
    const userid =req.params.id
    const details = await usemodel.findOne({_id:userid})
    console.log(details);
    res.render('userDetails',{details})
})
router.get('/delete/:id',async(req,res)=>{
    const deleteuser =req.params.id
    const del = await usemodel.deleteOne({_id:deleteuser})
    console.log(del,"deleted");
    res.redirect('/')
})

module.exports = router; 