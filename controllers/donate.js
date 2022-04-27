const Charity = require('../models/Donate');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Money = require('../models/Money');
var ObjectId = require('mongodb').ObjectID;

var notify = 1;
exports.adminlogin = (req, res, next) => {
	console.log(req.cookies.username);
	
    if (req.cookies.userData && req.cookies.username=="admin") {
        res.redirect('/add-charity');
    }
	else{
	var userName=req.body.username;
	console.log('abcabca');
	console.log(req.body.username);
	if(userName.toString() == "admin")
	{
			User.find({ username: userName })
            .then(result => {
                console.log(result, 'find');
                if (result.length > 0) {
                    notify = 1;
                    res.cookie("userData", notify, { overwrite: true });
                    Charity.find().sort({ updatedAt: -1 })
                        .then(products => {
                            res.render('add-charity', {
                                prods: products,
                                pageTitle: 'Add-Charity',
                                path: '/add-charity',
                                userData: 1,
								errors : ''
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    const user = User({
                        username: req.body.username,
                        status: 1,
						email: req.body.email
                    });
                    user.save().then(result => {
                        notify = 1;
                        res.cookie("userData", notify, { overwrite: true });
                        console.log(req.cookies, 'creayte')
                        Charity.find().sort({ updatedAt: -1 })
                            .then(products => {
                                 res.render('add-charity', {
                                prods: products,
                                pageTitle: 'Add-Charity',
                                path: '/add-charity',
                                userData: 1,
								errors : ''
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                }
            })
            .catch();
					
					
					
					
					
					
					
		
}
else
{
	 res.render('adminlogin', {
        pageTitle: 'adminlogin',
        path: '/adminlogin',
    });
}
	}
};

exports.getLoginPage = (req, res, next) => {
    if (req.cookies.userData) {
        res.redirect('/charity');
    }
	else{
    res.render('login', {
        pageTitle: 'Login',
        path: '/login',
    });
	
	}
};


exports.getAddCharity = (req, res, next) => {
	console.log(req.cookies.username);
	
 if (req.cookies.userData && req.cookies.username=="admin" ) {
       res.render('add-charity', {
        pageTitle: 'Add-Charity',
        path: '/add-charity',
    });
    }
else{
	
   res.render('adminlogin', {
        pageTitle: 'adminlogin',
        path: '/adminlogin',
    });
	console.log('abc');
	}
	
    
};

exports.getIndex = (req, res, next) => {
	if (req.cookies.userData && req.cookies.username == ""){
		res.redirect('/');
	}
    if (req.cookies.userData) {
        Charity.find().sort({ updatedAt: -1 })
            .then(products => {
                console.log(req.cookies);
                notify = 0;
					
						res.cookie("userData", notify, { overwrite: true });
               
				res.render('donation', {
                    prods: products,
                    pageTitle: 'Charity',
                    path: '/charity',
                    userData: req.cookies.userData,
					errors : ''
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        User.find({ username: req.body.username })
            .then(result => {
                console.log(result, 'find');
                if (result.length > 0) {
					console.log(result[0].status);
                    if(result[0].status==1)
					{
						
					User.updateOne({username:result[0].username}, {$set: {status:0}}, function(err, res) {});
					notify = 1;
					var username=result[0].username;
					console.log(username);
				res.cookie("userData", notify, { overwrite: true });
						res.cookie("username", username, { overwrite: true });
					console.log('aaaaaaaaaaaaa1');
                    Charity.find().sort({ updatedAt: -1 })
                        .then(products => {
                            res.render('donation', {
                                prods: products,
                                pageTitle: 'Charity',
                                path: '/charity',
                                userData: 1,
								errors : ''
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
           
					
  
					}
					else
					{
					notify = 1;
					var username=result[0].username;
					console.log(username);
					res.cookie("userData", notify, { overwrite: true });
						res.cookie("username", username, { overwrite: true });
					console.log('aaaaaaaaaaaaa1');
                    Charity.find().sort({ updatedAt: -1 })
                        .then(products => {
                            res.render('donation', {
                                prods: products,
                                pageTitle: 'Charity',
                                path: '/charity',
                                userData: 0,
								errors : ''
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
					}
                } else {
                    const user = User({
                        username: req.body.username,
                        status: 1,
						email: req.body.email
                    });
                    user.save().then(result => {
                     console.log('bbbbbbbbbbbbbb');
					notify = 1;
					var username=result[0].username;
				console.log(username);                  
				res.cookie("userData", notify, { overwrite: true });
					res.cookie("username", username, { overwrite: true });
                   User.update({username:result.username}, {$set: {status:0}});
				
                        console.log(req.cookies, 'creayte')
                        Charity.find().sort({ updatedAt: -1 })
                            .then(products => {
                                res.render('donation', {
                                    prods: products,
                                    pageTitle: 'Charity',
                                    path: '/charity',
                                    userData: 1,
									errors : ''
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                }
            })
            .catch();
    }
};

exports.postAddCharity = (req, res, next) => {
    const title = req.body.title;
    const total_amount = req.body.total_amount;
    const added_amount = req.body.added_amount;
    const closingDate = req.body.closingDate
    const charity = new Charity({
        title: title,
        total_amount: total_amount,
        added_amount: added_amount,
        closingDate: new Date(closingDate)
    });
    charity.save()
        .then(result => { //Save Defined by mongoose
            console.log('Created Data');
            res.redirect('/');

        })
        .catch(err => {
            console.log(err);

        });
}

exports.postAddDonation = (req, res, next) => {
if(Number(req.body.amount)<=0)
{
	 console.log('acabca');
	 Charity.find().sort({ updatedAt: -1 })
            .then(products => {
                console.log(req.cookies);
                notify = 0;
                res.cookie("userData", notify, { overwrite: true });
                res.render('donation', {
                    prods: products,
                    pageTitle: 'Charity',
                    path: '/charity',
                    userData: req.cookies.userData,
					errors : 'Error: Cannot Add 0 Bitcoins'
                });
			});
}
else
{   
const id = req.body.donateId;
    var status = '';
    Charity.find({ '_id': id })
        .then(result => { //Save Defined by mongoose
            if (result.length > 0) {
              for(var i = 0; i < result.length;i++){
                if (result[i].closingDate < new Date() || result[i].added_amount >= result[i].total_amount) {
                    status = 'Closed';
                } else {
                    status = 'Open';
					var people = Number(result[i].people) + 1;
                            var total = Number(result[i].added_amount) + Number(req.body.amount);
                }
                
			  } 
console.log(req.cookies.userData.username);			  
                 User.updateMany({username:{$ne:req.cookies.username}}, {$set: {status:1}}, function(err, res) {});			  
               Charity.updateOne({ '_id': id }, { added_amount: total, status: status, people: people, last_amount: Number(req.body.amount) }).then(r => {
                    result = req.cookies.userData.result
                    notify = 1;
                    res.cookie("userData", notify, { overwrite: true });
                    res.redirect('/charity');
                }).catch(err => {
                    console.log(err);

                });

            };
        })
        .catch(err => {
            console.log(err);

        });
}
}

exports.charityLogin = (req, res, next) =>  {
    	res.render('charity-login', {
        pageTitle: 'Charity-Login',
        path: '/charity-login',
    });

}

exports.sendMoney = (req, res, next) => {
		
	if((req.body.username == "keralaf") && (req.body.pass == "kerala123")){
        res.cookie("admin", "pass", {overwrite:true })
		Money.find({}, { total_sent:1, _id:0})
		.then(sent => {
			Charity.find({title:"Covid 19 Relief Funds"})
				.then(recieved => {
					Transaction.find({}, {_id:0})
						.then(transaction => {
							res.render('send-money', {
							sent: sent,
							recieved: recieved,
							transaction: transaction,	
							pageTitle: 'Send-Money',
							path: '/send-money',
							});
						})
				})
		})
		
	}
	else if(req.cookies.admin){
		Money.find({}, { total_sent:1, _id:0})
		.then(sent => {
			Charity.find({title:"Covid 19 Relief Funds"})
				.then(recieved => {
					Transaction.find({}, {_id:0})
						.then(transaction => {
							res.render('send-money', {
							sent: sent,
							recieved: recieved,
							transaction: transaction,	
							pageTitle: 'Send-Money',
							path: '/send-money',
							});
						})
				})
		})
	}
	else{
		res.redirect('/charity-login');
	}
	
}

exports.postSendMoney = (req,res,next) => {
	
	const transaction = Transaction({
			to: req.body.to,
			amount: req.body.amount
		});
		transaction.save().then(result => {
			console.log('Save Succesfull');
		})
		.catch(err => {
            console.log(err);
        });
	var total = '';
	var id = '';
	Money.find({}).sort({'_id':-1}).limit(1)
		.then(result => { //Save Defined by mongoose
            if (result.length > 0) {
				for(var i = 0; i < result.length;i++){
                        var total = Number(result[i].total_sent) + Number(req.body.amount);
						console.log(total);
					}
				Money.updateOne({},{$set: { total_sent: total }},{ upsert: true }).then(result => {
				console.log('Update Succesfull');
				})
				.catch(err => {
					console.log(err);
				});
			}
		})
			
	
	res.redirect('/send-money')
}

exports.trackMoney = (req, res, next) => {
	Money.find({}, { total_sent:1, _id:0})
		.then(sent => {
			Charity.find({title:"Covid 19 Relief Funds"})
				.then(recieved => {
					Transaction.find({}, {_id:0})
						.then(transaction => {
							res.render('track-money',{
							sent: sent,
							recieved: recieved,
							transaction: transaction,
							pageTitle: 'Track-Money',
							path: '/track-money',
						});
					})
			})
		})
}

exports.logOutUser = (req, res, next) => {
    res.clearCookie('userData');
	res.clearCookie('admin');
	res.clearCookie('password');
    res.redirect('/');
}

