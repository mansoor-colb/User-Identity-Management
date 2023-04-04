const express = require("express");
const app = express();
const path = require("path");
const nodemailer=require('nodemailer')
let formidable = require('formidable');
let fs = require('fs');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");


app.use(bodyParser.json());
app.use(express.static('public'))



const conn = mysql.createConnection({
	multipleStatements: true,
	host: "localhost",
	user: "root",
	password: "",
	database: "uid2",

});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});





const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};


app.post(
	"/upload",
	// upload.single("picfile" /* name attribute of <file> element in your form */),
	(req, res) => {
		let form = new formidable.IncomingForm();
		form.parse(req, function (error, fields, file) {
			let filepath = file.picfile.filepath;
			let newpath = "C:/xampp/htdocs/Dbms proj/public/profileimages/";
			
			newpath += file.picfile.originalFilename;
			console.log(filepath)
		
			//Copy the uploaded file to a custom folder
			fs.rename(filepath, newpath,  err => {
				if (err) res.send(JSON.stringify({ status: 500, error: 1, response:newpath}));
		
				res.send(JSON.stringify({ status: 200, error: null, response:newpath}))
			  });
			
			  
		  });
		}
  );

  app.post("/mail", (req,res) => {
	async function mail(req,res){
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    service: 'gmail', // true for 465, false for other ports
    auth: {
      user: 'webdearsproject@gmail.com', // generated ethereal user
      pass: 'iefrtrdbsudvpsyx', // generated ethereal password
    },
  });
  var digits = '1234567890';
  var otpp = ''
  for (i = 0; i < 4; i++) {
	  otpp += digits[Math.floor(Math.random() * 10)];
  }
  var mailoptions={
	from:'webdearsproject@gmail.com',
	to:req.body.tomail,
	subject:'OTP FROM UID',
	html:`<p>One Time PASSWORD FOR UID IS <b>${otpp} </b> </p>`
  }
 await transporter.sendMail ( mailoptions,  function(err,info){
	if(err){
		res.send(JSON.stringify({ status: 500, error: null}))

	}
	else{
		
		let sqld = `DELETE FROM otp where email_Id="${req.body.tomail}" `;
		let queryd = conn.query(sqld, (err, result) => {
			if (err) throw err;




	
		let data = { email_Id:req.body.tomail, otp:otpp,phone:req.body.phone_no};
		let sql = "INSERT INTO otp SET ?";
		let query = conn.query(sql, data, (err, result) => {
			if (err) res.send(JSON.stringify({ status: 500, error: null}));
			else{

				res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
			}
			// res.send(JSON.stringify({ status: 200, }))
		})
	})
	}

  })
}
mail(req,res)

})



app.get("/validateotp", (req, res) => {
	console.log(req.query.mail)
	console.log(req.query.mail)
	console.log(req.query.otpval)
	// console.log(req.query.otpval)

	let sql = `SELECT * FROM otp where email_Id="${req.query.mail}" `;
	let query = conn.query(sql, (err, result) => {
		console.log(result[0].otp)
		if (req.query.otpval!=result[0].otp) {
			res.send(JSON.stringify({ status: 500, error: null, response: result }));
		}

		else if(req.query.otpval==result[0].otp){
		

					res.send(JSON.stringify({ status: 200, error: null, response: result }));

		}
		else{
			res.send(JSON.stringify({ status: 700, error: null, response: result }));
			
		}
		
	});
});




app.get("/findfam", (req, res) => {

let arr=[]
let sql = `SELECT Sir_name FROM family where FAM_ID="${req.query.fam_id}";SELECT Fname FROM details WHERE UID IN(SELECT UID FROM family where FAM_ID="${req.query.fam_id}" AND Relation="Father" OR (Relation LIKE "%Son%" AND FAM_ID="${req.query.fam_id}") )`;
	// let sql = `SELECT Sir_name FROM family where FAM_ID="${req.query.fam_id}";SELECT Fname FROM details WHERE UID IN(SELECT UID FROM family where FAM_ID="${req.query.fam_id}" AND Relation="Father") `;
	let query = conn.query(sql, (err, result) => {
		// console.log(result[0].otp)
		if (result.length!=0) {
			arr.push({surname:result[0]})
			arr.push({relation:result[1]})
			// req.query.otpval!=result[0].otp
			res.send(JSON.stringify({ status: 200, error: null, response: arr }));
		}


		else{
			res.send(JSON.stringify({ status: 700, error: null, response: null }));
			
		}
		
	});
});



app.get("/findrelation", (req, res) => {

		let sql = `SELECT Relation,Sir_name FROM family where FAM_ID="${req.query.fam_id}" AND UID="${req.query.uid}"`
		let query = conn.query(sql, (err, result) => {
			if (err )throw err;
			if (result.length!=0) {
				console.log(result)
				
				// req.query.otpval!=result[0].otp
				res.send(JSON.stringify({ status: 200, error: null, response:result }));
			}
	
	
			else{
				res.send(JSON.stringify({ status: 700, error: null, response: null }));
				
			}
			
		});
	});














function uidcre(){
	var digits = '1234567890';
	var otpp = ''
	for (i = 0; i < 3; i++) {
		otpp += digits[Math.floor(Math.random() * 10)];
	}
	otpp+='-'
	for (i = 0; i < 3; i++) {
		otpp += digits[Math.floor(Math.random() * 10)];
	}
	otpp+='-'
	for (i = 0; i < 3; i++) {
		otpp += digits[Math.floor(Math.random() * 10)];
	}
	return otpp
}

app.post("/insertdata", (req, res) => {

	let uiid=''
	let flag=0
	 while(true){
		// console.log('hiiiii000')
		
		 uiid=uidcre();
		uiid= uiid.toString();
let sqll = `SELECT UID FROM details WHERE UID="${uiid}"`;
let query = conn.query(sqll,(err, result) => {
	if (err) throw err;
	
	
	if(result.length==0){
		console.log(result)

	}
	else if (err){
		console.log(err)

	}

	})
	

			break;


	}
	let data3 = { Hashcode: uiid,Fname: req.body.Fname,Lname:req.body.Lname};
	let sql3 = "INSERT INTO hash_table SET ?";
	let query3 = conn.query(sql3, data3, (err3, result3) => {
		if (err3) throw err3;

		fs.renameSync(`C:/xampp/htdocs/Dbms proj/public/${req.body.Profile}`, `C:/xampp/htdocs/Dbms proj/public/profileimages/${uiid}.png`);
		let data = { UID: uiid,Fname: req.body.Fname,Lname: req.body.Lname,Phone:req.body.Phone,Email:req.body.Mail,Age:req.body.Age,Address:req.body.Address,Gender:req.body.Gender,Dob:req.body.Dob,Time:req.body.Time,CID:req.body.Cid,State:req.body.State,Pin:req.body.Pin,Fam_id:req.body.Fam_id,Profile:`profileimages/${uiid}.png`};
		let sql = "INSERT INTO details SET ?";
		let query = conn.query(sql, data, (err, result) => {

			let sql4=`INSERT INTO family(UID,FAM_ID,Relation,Sir_name) values ('${uiid}','${req.body.Fam_id}',"${req.body.Relation}",'${req.body.Lname}')`;
			let query4 = conn.query(sql4, async (err,result) => {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ status: 500, error: null, response: "New Record is Added successfully" }));

				
			}
			else{

				res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
				let transporter = nodemailer.createTransport({
					
					service: 'gmail',
					auth: {
					  user: 'webdearsproject@gmail.com', // generated ethereal user
					  pass: 'iefrtrdbsudvpsyx', // generated ethereal password
					},
				  });

				var mailoptions={
					from:'webdearsproject@gmail.com',
					to:req.body.Mail,
					subject:'UID CARD',
					html:`<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<style>
							*
							{
								margin:00px;
								padding: 00px;
								
							}
							
							.font
							{
								
								height: 375px;
								width:225px;
								position: relative;
								border-radius:10px;
								
								background-size: 225px 375px;
								background-repeat: no-repeat;
							}
							
							.companyname{
								color:White;
								
								padding: 10px;
								font-size:25px;
							}
					
							.tab {padding-right:30px;}
					
							.top img
							{
								height: 90px;
								width:90px;
								background-color:#e6ebe0;
							
								
								object-fit: content;
								
								
							}
							.ename{
							
								color:black;
								font-size:20px;
							}
							.edetails
							{
							
								text-transform:capitalize;
								font-size: 11px;
								text-emphasis: spacing;
								margin-left: 5px;
							}
							
					
					
						
							
					
							.qr img
							{
								
								height: 90px;
								width:120px;
								margin:20px;
								background-color:white;
								
							}
							.edetails .Address
							{
							   
								
								text-align: justify;
							}
						 
						</style>
					   
					</head>
					<body>
						<div class="container">
							<div class="padding">
							<div class="font" >
								<div class="companyname">UID<br><span class="tab">CARD</span></div>
								<div class="top">
									<img src="cid:profileimages/${uiid}.png" alt="">
								</div>
								<div class="">
									<div class="ename">
									<p><b>${req.body.Fname} ${req.body.Lname}</b></p>
									
									</div>
									<p>UID : ${uiid}</p>
									<div class="edetails">
										<P><b>Mobile No :</b> ${req.body.Phone}</P>
										<P><b>Mail:</b> ${req.body.Mail}</P>
										<p><b>DOB :</b> ${req.body.Dob}</p>
										<div class="Address"><b>Address : </b>${req.body.Address}</div>
										
									</div>
					
									<div class="qr" style="position:absolute;right:10px;bottom:10px">
									<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uiid}" alt="">
									</div>
							  
								</div>
							</div>
						</div>
						   
						</div>
					</body>
					</html>`,
					attachments: [{
						filename: `${uiid}.png`,
						path: `public/profileimages/${uiid}.png`,
						cid: `profileimages/${uiid}.png` 
					},
					
				]
				  }
				 await transporter.sendMail ( mailoptions,  function(err,info){
					console.log(err)
					console.log("888888")
					console.log(info)

				 })
			}
		})
		});

	})

	

	})

	



app.get("/data", (req, res) => {

let sqll = `SELECT * FROM details `;
let query = conn.query(sqll,(err, result) => {
	if (err) throw err;

	
	res.send(JSON.stringify({ status: 500, error: null, response: result }));


	})
})


app.get("/glbsearch", (req, res) => {
	console.log(req.query.search)
	let sql = `SELECT * FROM details WHERE Fname LIKE "%${req.query.search}%" OR Lname LIKE "%${req.query.search}%" OR Phone LIKE "%${req.query.search}%"
	OR Age LIKE "%${req.query.search}%" OR Email LIKE "%${req.query.search}%" OR Address LIKE "%${req.query.search}%" OR Dob LIKE "%${req.query.search}%" OR State LIKE "%${req.query.search}%"
	OR Pin LIKE "%${req.query.search}%"`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;

		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/gendersearch", (req, res) => {
	// console.log(req.query.gender)
	let sql = `SELECT * FROM details WHERE Gender in (${req.query.gender})`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/centersearch", (req, res) => {
	// console.log(req.query.gender)
	let sql = `SELECT * FROM details WHERE CID IN (SELECT CID from center where CNAME='${req.query.center}')`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


app.get("/statesearch", (req, res) => {
	// console.log(req.query.state)
	let sql = `SELECT * FROM details WHERE State = "${req.query.state}"`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/agesearch", (req, res) => {
	// console.log(req.query.gender)
	let sql = `SELECT * FROM details WHERE Age BETWEEN ${req.query.age1} and ${req.query.age2}`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/famsearch", (req, res) => {
	console.log(req.query.fam)
	if(req.query.query==0){
	let sql = `SELECT * FROM details WHERE UID IN( SELECT UID FROM family where FAM_ID=${req.query.fam})`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
    }
	else{
		let sql = `SELECT * FROM details WHERE UID IN( SELECT UID FROM family where FAM_ID IN( SELECT DISTINCT FAM_ID FROM family where Sir_name='${req.query.fam}')) `;
	    let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});

	}
});

app.get("/datesearch", (req, res) => {
	// console.log(req.query.gender)
	let sql = `SELECT * FROM details WHERE Dob  BETWEEN '${req.query.from}' and '${req.query.to}' `;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


app.get("/familymembers", (req, res) => {
	// console.log(req.query.gender)
	let sql = `SELECT D.UID,D.Profile,D.Fname, D.Lname ,F.Relation FROM details D,family F WHERE D.UID=F.UID and F.FAM_ID=D.Fam_id and F.FAM_ID='${req.query.fam}' `;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


app.get("/editsearch", (req, res) => {
	// console.log(req.query.gender)
	console.log(req.query.uid)
	let sql = `SELECT * FROM details WHERE UID='${req.query.uid}' `;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.get("/hashsearch", (req, res) => {
	// console.log(req.query.gender)
	console.log(req.query.uid)
	let sql = `SELECT * FROM hash_table WHERE Hashcode='${req.query.uid}' `;
	let query = conn.query(sql, (err, result) => {
		
		if(result.length==0){

			res.send(JSON.stringify({ status: 500, error: null, response: result }));
		}
		else if(result.length!=0){
			res.send(JSON.stringify({ status: 200, error: null, response: result }));

		}
		else{
			if (err) throw err;
		}
	});
});

app.post("/updatedata", (req, res) => {

	var reg=/[0-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}/
	if(req.body.Profile.indexOf(`${req.body.Uid}`)==-1){
		fs.unlinkSync(`C:/xampp/htdocs/Dbms proj/public/profileimages/${req.body.Uid}.png`);
	fs.renameSync(`C:/xampp/htdocs/Dbms proj/public/${req.body.Profile}`, `C:/xampp/htdocs/Dbms proj/public/profileimages/${req.body.Uid}.png`);
	}

	let sql = `UPDATE details SET Fname='${req.body.Fname}' ,Lname='${req.body.Lname}', Phone='${req.body.Phone}' ,Email='${req.body.Mail}' ,
			   Age='${req.body.Age}' ,Address='${req.body.Address}',Gender='${req.body.Gender}',Dob='${req.body.Dob}',
			   Time='${req.body.Time}' ,CID='${req.body.Cid}',State='${req.body.State}',
			   Pin='${req.body.Pin}',Fam_id='${req.body.Fam_id}',Profile='profileimages/${req.body.Uid}.png' 
			   WHERE UID='${req.body.Uid}'`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: err, response: result }));
	});
});



app.get("/pop", (req, res) => {
	arr=[]
	
	let sql = `
	SELECT DISTINCT(YEAR(Dob)) AS YEAR FROM details ORDER BY (YEAR(Dob)) ;
	SELECT COUNT(*) AS count,YEAR(Dob) AS yearf FROM details WHERE Gender='female' GROUP BY (YEAR(Dob));
	SELECT COUNT(*) AS count,YEAR(Dob) AS yearm FROM details WHERE Gender='male' GROUP BY (YEAR(Dob));
	SELECT COUNT(*) AS count,YEAR(Dob) AS yeart FROM details WHERE Gender='trans' GROUP BY (YEAR(Dob));
	SELECT count(*) AS totaluser FROM details ;
	SELECT count(*) AS c,Gender  FROM details GROUP BY (Gender);
	SELECT State,COUNT(*) AS st FROM details GROUP BY (State)
	`;
	
	let query = conn.query(sql, [1,2],(err, result) => {
		if (err) throw err;
		// console.log({female:result})
		arr.push({Total:result[0]})
		arr.push({female:result[1]})
		arr.push({male:result[2]})
		arr.push({trans:result[3]})
		arr.push({user:result[4]})
		arr.push({category:result[5]})
		arr.push({state:result[6]})
	
		res.send(JSON.stringify({ status: 200, error: null, response: arr }));
	
		})

});




app.get("/fetch", (req, res) => {


let sqll = `SELECT * FROM details `;
let query = conn.query(sqll,(err, result) => {
	if (err) throw err;

	
	res.send(JSON.stringify({ status: 500, error: null, response: result }));


	})
});
app.get("/fetch6", (req, res) => {


	let sqll = `SELECT * FROM details ORDER BY id DESC LIMIT 4`;
	let query = conn.query(sqll,(err, result) => {
		if (err) throw err;
	
		
		res.send(JSON.stringify({ status: 500, error: null, response: result }));
	
	
		})
	});
  
app.post("/signup", (req, res) => {
	let sql = `SELECT * FROM center where CNAME="${req.body.Center}" `;
	let query = conn.query(sql, (err, result) => {
		if (result.length!=0) {
		if (req.body.Pass==result[0].Pass) {
			res.send(JSON.stringify({ status: 200, error: null, response: result }));
		}
		else{
			res.send(JSON.stringify({ status: 500, error: null, response: result }));
			
		}
	}
	else{
		res.send(JSON.stringify({ status: 700, error: null, response: result }));

	}
	})

	})

function ty(){
	let transporter = nodemailer.createTransport({
					
		service: 'gmail',
		auth: {
		  user: 'webdearsproject@gmail.com', // generated ethereal user
		  pass: 'iefrtrdbsudvpsyx', // generated ethereal password
		},
	  });
	  var mailoptions={
		from:'webdearsproject@gmail.com',
		to:'mansoorahmed52002@gmail.com',
		subject:'UID CARD',
		html:`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				*
				{
					margin:00px;
					padding: 00px;
					
				}
				.top #prof
				{
					height: 90px;
					width:90px;
					background-color:#e6ebe0;
					border-radius:57px;
					position: absolute;
					top: 60px;
					left: 102px;
					object-fit: content;
					border:3px solid rgba(255 , 255 , 255 , .2);
					
				}
				
				
		
				.qr img
				{
					position: absolute;
					top: 85%;
					left: 32%;
					height: 30px;
					width:120px;
					margin:20px;
					background-color:white;
					
				}
				.edetails .Address
				{
				   
					width: 60%;
					text-align: justify;
				}
			 
			</style>
		   
		</head>
		<body>
			<div class="container">
				<div class="padding">
				<div class="font" >
					<div class="companyname">UID<br><span class="tab">CARD</span></div>
					<div class="top">
						<img id="prof" src="cid:profileimages/mansoor image.jpg" alt="">
					</div>
					<div class="">
						<div class="ename">
						<p class="p1"><b>3444</b></p>
						<p>Media Developer</p>
						</div>
						<div class="edetails">
							<P><b>Mobile No :</b> 2</P>
							<P><b>Mail:</b> 4443</P>
							<p><b>DOB :</b> 4344</p>
							<div class="Address"><b>Address : </b>ghhhh</div>
							
						</div>
		
						<div class="qr" style="position:absolute;right:10px;bottom:10px">
						<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="">
						</div>
				  
					</div>
				</div>
			</div>
			   
			</div>
		</body>
		</html>`,
		attachments: [{
			filename: `mansoor image.jpg`,
			path: `public/profileimages/mansoor image.jpg`,
			cid: `profileimages/mansoor image.jpg` 
		},
		
	]
	  }
	
	  
	  transporter.sendMail ( mailoptions,  function(err,info){
		if(err){
					console.log(err)
					console.log("888888")
					console.log(info)
	
		}
	})
}
// ty()
  // set port, listen for requests
  const PORT = process.env.PORT || 1234;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });