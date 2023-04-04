$(document).ready(function(){
    if(!(localStorage.getItem('centerid'))){
        window.location.href='login.html'

    }
    let query =window.location.search
    let url =new URLSearchParams(query)
    let val=url.get('uid')

    $.ajax({
        
        url:`http://localhost:1234/editsearch?uid=${val}`,
        type: 'GET',
        dataType: "json",
   
    
        success: function(res){
            console.log(res.response)
            if(res.response.length!=0){
                $("#picdata").val(`${res.response[0].Profile}`)
                $("#uidv").val(`${res.response[0].UID}`)
               $("#imageprofile").attr("src",`${res.response[0].Profile}`)
                let fname=$("#val-fname").val(`${res.response[0].Fname}`)
                let lname=$("#val-lname").val(`${res.response[0].Lname}`)
                let phone=$("#val-phone").val(`${res.response[0].Phone}`)
                let maill=$("#val-email").val(`${res.response[0].Email}`)
                
                $(`input[name="gndradio"][value=${res.response[0].Gender}]`).attr('checked', true);
                let age=$("#val-age").val(`${res.response[0].Age}`)
                let dob=$("#mdate").val(`${res.response[0].Dob}`)
                let address=$("#val-address").val(`${res.response[0].Address}`)
                let state=$("#inputState").val(`${res.response[0].State}`)
                let pin=$("#pincod").val(`${res.response[0].Pin}`)
                let famid=$("#val-fid").val(`${res.response[0].Fam_id}`)
                $.ajax({
                    url: `http://localhost:1234/findrelation?fam_id=${res.response[0].Fam_id}&uid=${res.response[0].UID} `,
                    type: 'GET',
                    dataType: "json",
                
                    success: function(res){
                        if(res.status==200){
                            console.log(res)
                            $("#display_fam").val(`${res.response[0].Sir_name}'s`)

                            // $("#inputrelation").val(`${res.response[0].Relation}`)
                            $("#inputrelation").append(`<option>${res.response[0].Relation}</option>`)
            
                        }
                    }
                })


            }
            else{
                alert("No user Exist")
            }



        }


        })
    // alert(val)
})
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





















$("#submit").on("click",function(){
    let uid=$("#uidv").val()
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

if(pin==''){
    condition=false

    toastr.warning("Please Enter Pinode", "Pincode  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}
if(famid==''){
       
    condition=false
    toastr.warning("Please Enter Family Id", "FamID  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 

       
}


if(condition){
    
  

                            $.ajax({
                                url:"http://localhost:1234/updatedata",
                                type:"post",
                                dataType: "json",
                                data: {Uid:uid, Fname:fname,Lname:lname,Phone:phone,Mail:maill,Gender:gender,Age:age,Dob:dob,Address:address,Time:new Date(),Cid:123,State:state,Pin:pin,Fam_id:famid,Profile:picdata
                                },
                                success: function(res){
                                    if(res.status==200){
                                        swal("Data Updated Successfully")
                                        // $("#otpbutton").css({"display":"none"})
                                        console.log(res)
                                        setTimeout(function(){
                                            window.location.reload() 
                                            // alert('done')
                                        },3000)
                                       
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
                
              
                
         
    })

