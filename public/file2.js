$(document).ready(function () {
    if(!(localStorage.getItem('centerid'))){
        window.location.href='login.html'

    }
    $("#fileuploder").on("click",async function(){
       
        let formData = new FormData(); 
        formData.append("picfile", picfile.files[0]);
        await fetch('http://localhost:1234/upload', {
            method: "POST", 
            body: formData
    }).then(response => response.json())
 
            // Displaying results to console
            .then(json => {
                if(json.status==200){

                    let src=json.response.indexOf("profileimages")
                    src=json.response.slice(src)

                    $("#imageprofile").attr("src",src)
                    $("#picdata").val(src)
                }
                
                
                console.log(json.response)}); 
    })



$("#validate_section").css({"display":"none"})
$("#val-age").focusin(function(){
    var val=$("#mdate").val();

var month_diff = Date.now() - new Date(val);
var age_dt = new Date(month_diff); 
var year = age_dt.getUTCFullYear();
var age = Math.abs(year - 1970);
$("#val-age").val(age)
})


$("#otpbutton").on("click",function(){
    let picdata=$("#picdata").val()
    let fname=$("#val-fname").val()
    let lname=$("#val-lname").val()
    let phone=$("#val-phone").val()
    let maill=$("#val-email").val()
    let gender=$('input[name="gndradio"]:checked').val()
    let age=$("#val-age").val()
    let dob=$("#mdate").val()
    let address=$("#val-address").val()
    let state=$("#inputState").val()
    let rel=$("#inputrelation").val()
    let pin=$("#pincod").val()
    let famid=$("#val-fid").val()
    // alert(picdata)
var condition=true;

    if(picdata==0){
 toastr.warning("Please upload a photo", "Profile Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
 condition=false
    }
    if(fname=='' || fname==' '){
        toastr.warning("Please Enter a valid first name", "First name Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false 
    }
    if(lname==''){
            toastr.warning("Please Enter a valid Last name", "Last name Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false     
     }
     if(phone!='' || phone==''){
        var nump= /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        if(!nump.test(phone)){
            condition=false
            toastr.warning("Please Enter a valid Phone Number", "Phone Number Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        }

               
     }
     if(maill!=''|| maill==''){
        var epat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!epat.test(maill)){
            condition=false
            toastr.warning("Please Enter a valid Mail", "Mail  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        }
               
     }

     if(gender==''){

        condition=false

            toastr.warning("Please select Gender", "Gender  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        
               
     }
     if(age==''){
        condition=false

        toastr.warning("Please select Age", "Age  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
    
           
 }
 if(dob.length==0){
       
    condition=false
    toastr.warning("Please select Date of Birth", "DOB  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(address==''){
       
    condition=false
    toastr.warning("Please Enter Address", "Address  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(state=='Choose...'){
       
    condition=false
    toastr.warning("Please select State", "State  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(rel=='Choose...'){
       
    condition=false
    toastr.warning("Please select Relation", "Relation  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(pin==''){
    condition=false

    toastr.warning("Please Enter Pinode", "Pincode  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(famid=='' || !(famid.length==4)){
    // alert(famid.length)
    condition=false
    toastr.warning("Please Enter Family Id with 4 digits Only", "FamID  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}


if(condition){
    $("#val-phone").attr("disabled","disabled");
    $("#val-email").attr("disabled","disabled");
    $("#val-phone").attr("title","Phone can't be edited,if want to change phone create a new sign up by refreshing");
    $("#val-email").attr("title","Email can't be edited,if want to change email create a new sign up by refreshing");

    $.ajax({
            url:"http://localhost:1234/mail",
            type:"post",
            dataType: "json",
            data: { tomail:maill,phone_no:phone
            },
            beforeSend:function(){ 
                $("#otpbutton").attr("disabled","disabled");
                $("#otpbutton").html('Sending...');
            },
            success: function(res){
                if(res.status==200){
                    toastr.success("Check Your Mail Inbox","OTP SENT",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                    $("#otpbutton").css({"display":"none"})
                    $("#validate_section").slideDown();
                }
                else if(res.status==500){
                    alert('error')
                }
            }
        })
}
})


$("#submit").on("click",function(){

    let picdata=$("#picdata").val()
    let fname=$("#val-fname").val()
    let lname=$("#val-lname").val()
    let phone=$("#val-phone").val()
    let maill=$("#val-email").val()
    let gender=$('input[name="gndradio"]:checked').val()
    let age=$("#val-age").val()
    let dob=$("#mdate").val()
    let address=$("#val-address").val()
    let state=$("#inputState").val()
    let rel=$("#inputrelation").val()
    let pin=$("#pincod").val()
    let famid=$("#val-fid").val()
    let otpvalue=$("#val-otp").val()
    // alert(picdata)
var condition=true;

    if(picdata==0){
 toastr.warning("Please upload a photo", "Profile Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
 condition=false
    }
    if(fname=='' || fname==' '){
        toastr.warning("Please Enter a valid first name", "First name Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false 
    }
    if(lname==''){
            toastr.warning("Please Enter a valid Last name", "Last name Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false     
     }
     if(phone!='' || phone==''){
        var nump= /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        if(!nump.test(phone)){
            condition=false
            toastr.warning("Please Enter a valid Phone Number", "Phone Number Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        }

               
     }
     if(maill!=''|| maill==''){
        var epat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!epat.test(maill)){
            condition=false
            toastr.warning("Please Enter a valid Mail", "Mail  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        }
               
     }

     if(gender==''){

        condition=false

            toastr.warning("Please select Gender", "Gender  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        
               
     }
     if(age==''){
        condition=false

        toastr.warning("Please select Age", "Age  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
    
           
 }
 if(dob.length==0){
       
    condition=false
    toastr.warning("Please select Date of Birth", "DOB  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(address==''){
       
    condition=false
    toastr.warning("Please Enter Address", "Address  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(state=='Choose...'){
       
    condition=false
    toastr.warning("Please select State", "State  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(rel=='Choose...'){
       
    condition=false
    toastr.warning("Please select Relation", "Relation  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(pin==''){
    condition=false

    toastr.warning("Please Enter Pinode", "Pincode  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(famid=='' || !(famid.length==4)){
    // alert(famid.length)
       
    condition=false
    toastr.warning("Please Enter Family Id with 4 digits Only", "FamID  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}


if(condition){
    
  
        $.ajax(`http://localhost:1234/validateotp?mail=${maill}&otpval=${otpvalue} `, {
            type: 'GET',
            dataType: 'json',
         
      
            success: function(res){
                // console.log(res)
                if(res.status==200){
                    console.log(res)
                    // alert(0000)
                  var conf= confirm("Press this confirm button!");
                  if(conf){
                            let picdata=$("#picdata").val()
                            let fname=$("#val-fname").val()
                            let lname=$("#val-lname").val()
                            let phone=$("#val-phone").val()
                            let maill=$("#val-email").val()
                            let gender=$('input[name="gndradio"]:checked').val()
                            let age=$("#val-age").val()
                            let dob=$("#mdate").val()
                            let address=$("#val-address").val()
                            let state=$("#inputState").val()
                            let rel=$("#inputrelation").val()
                            let pin=$("#pincod").val()
                            let famid=$("#val-fid").val()
                            $.ajax({
                                url:"http://localhost:1234/insertdata",
                                type:"post",
                                dataType: "json",
                                data: { Fname:fname,Lname:lname,Phone:phone,Mail:maill,Gender:gender,Age:age,Dob:dob,Address:address,Time:new Date(),Cid:localStorage.getItem('centerid'),State:state,Pin:pin,Fam_id:famid,Profile:picdata,Relation:rel
                                },
                                success: function(res){
                                    if(res.status==200){
                                        swal("Data Saved Successfully")
                                        // $("#otpbutton").css({"display":"none"})
                                        console.log(res)
                                        setTimeout(function(){
                                            window.location.reload()
                                        },3000)
                                        // alert("Success")
                                        // $("#validate_section").slideDown();
                                    }
                                    else if(res.status==500){
                                        $("#insertform").trigger("reset");
                                        console.log(res)
                                        console.log("poo")
                                        // sweetAlert("Oops...","Something went wrong !!","error")
                                        swal("Oops...", "Something went wrong !!", "error");
                                        // alert("error")

                                    }
                                    
                                }
                            })
                        }
                }
                else if(res.status==500){
                    // alert('error')
                    console.log(res)
                                        // console.log(res)
                     swal("Invalid OTP","Please Enter valid OTP","error")
                    // sweetAlert("In Correct","Enter Valid OTP!!","Error")
                    

                }
                else if(res.status==700){
                    console.log(res)
                    // console.log(res)
                 swal("Something went wrong","Please Try later","error")
                                    }
                
            }
        })
    }

})




$("#val-fid").focusout(function(){
    let val=$("#val-fid").val();
    if(val!=''){
        $.ajax({
            // url:"http://localhost:1234/findfam",
            url: `http://localhost:1234/findfam?fam_id=${val} `,
            type: 'GET',
            dataType: "json",
        
            success: function(res){
                let gnd=$('input[name="gndradio"]:checked').val()
                let rel="son";
                if(gnd=='female'){
                    rel='Daughter'

                }
                if(res.status==200){
                    if(res.response[0].surname.length!=0){

                    
                    $("#display_fam").val(`${res.response[0].surname[0].Sir_name}'s`)
                
                    // Swal.fire('Saved!', '', 'success')
                    if(res.response[1].relation.length!=0){
                    $("#inputrelation").html('')
                    for(let item of res.response[1].relation){
                    $("#inputrelation").append(`<option value="${item.Fname}'s ${rel}">${item.Fname}'s ${rel}</option>`)
                    }
                    for(let item of res.response[1].relation){
                        if(gnd=='female'){
                            rel='Wife'
                          
                        $("#inputrelation").append(`<option value="${item.Fname}'s ${rel}">${item.Fname}'s ${rel}</option>`)
        
                        }
                        }
                    console.log(res)
                }
                else{
                    $("#inputrelation").html('')
                    $("#inputrelation").append(`<option selected="selected">Choose...</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>`)
                }
                }
                else{
                    $("#inputrelation").html('')
                    $("#inputrelation").append(`<option selected="selected">Choose...</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>`)

        
                    $("#display_fam").val($("#val-lname").val())
                    console.log(res)

                }
                    // alert("Success")
                    // $("#validate_section").slideDown();
                
                }
                else if(res.status==700){
                    $("#inputrelation").html('')
                    $("#inputrelation").append(`<option selected="selected">Choose...</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>`)

        
                    $("#display_fam").val($("#val-lname").val())
                    console.log(res)

                }
            }
            })
    }
})






})