$(document).ready(function(){
    if(!(localStorage.getItem('centerid'))){
        window.location.href='login.html'

    }
   $("#cool").click(function(){
       let v=$("#mdate").val()
       var myDate = new Date('2023-01-11').getTime();
       if(new Date(v).getTime()>myDate){
        console.log('yes')
       }
       else{console.log('no')}
       console.log(myDate);
   
   
    alert(v.split("/").reverse().join("-"))
   }) 
       
async function load(){
    // alert("kk")
    $("#tbody").html('')
    await fetch('/fetch')
    .then(response => response.json())
    .then(data =>{ 
        data.response.sort((a, b) => {
            return b.ID - a.ID;
        });
        $.each(data.response,function(key,value){
            console.log(value.Fname)
            $("#tbody").append(
            `<tr>
                <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                <td>${value.Fname}</td>
                <td>${value.Lname}</td>
                <td>${value.Fam_id}</td>
                <td>${value.Phone}</td>
                <td>${value.Email}</td>
                
                <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                <td>${value.Dob}</td>
                <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                <td>${value.Address}</td>
                <td>${value.State}</td>
                <td>${value.Pin}</td>

                <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                </td>
            </tr>`
            )


        })
        
        
        
        // console.log(data)
    })

}
load()



$("#glbsearch").on("keyup",function(){
    var item =$(this).val();

    $.ajax({
        
        url:`http://localhost:1234/glbsearch?search=${item}`,
        type: 'GET',
        dataType: "json",
        // data:{query:val},
    
        success: function(res){
            $("#tbody").html('')
            console.log(res.response)
            if(res.response.length==0){
                $("#tbody").append(
                    `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                       
                        
                        
        
                        
                    </tr>`
                    )
                    return

            }
            res.response.sort((a, b) => {
                return b.ID - a.ID;
            });
            $.each(res.response,function(key,value){
                $("#tbody").append(
                `<tr>
                    <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                    <td>${value.Fname}</td>
                    <td>${value.Lname}</td>
                    <td>${value.Fam_id}</td>
                    <td>${value.Phone}</td>
                    <td>${value.Email}</td>
                    
                    <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                    <td>${value.Dob}</td>
                    <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                    <td>${value.Address}</td>
                    <td>${value.State}</td>
                    <td>${value.Pin}</td>
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                    </td>
                </tr>`
                )
    
    
            })

        }
    })

})
    
$("#filterhead").on("click",function(){
    // $(this).slideDown();
    if($("#filtercard").data("ud")=='d'){

        $("#filtercard").css({"height":"300px"});
        $("#filtercard").data("ud","u")
    }
    else{
        $("#filtercard").css({"height":"60px"});
        $("#filtercard").data("ud","d")
    }
})


$("#gender-search").on("click",function(){

    var gender = [];
    $("input:checkbox[name='gender']:checked").each(function(){    
        gender.push($(this).val());    		
});
  if(gender.length==0){
    return
  }
    gender=gender.join(", ")
    $.ajax({
        
        url:`http://localhost:1234/gendersearch?gender=${gender}`,
        type: 'GET',
        dataType: "json",
        // data:{query:val},
    
        success: function(res){
            $("#tbody").html('')
            console.log(res.response)
            if(res.response.length==0){
                $("#tbody").append(
                    `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                       
                        
                        
        
                        
                    </tr>`
                    )
                    return

            }
            res.response.sort((a, b) => {
                return b.ID - a.ID;
            });
            $.each(res.response,function(key,value){
                $("#tbody").append(
                `<tr>
                    <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                    <td>${value.Fname}</td>
                    <td>${value.Lname}</td>
                    <td>${value.Fam_id}</td>
                    <td>${value.Phone}</td>
                    <td>${value.Email}</td>
                    
                    <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                    <td>${value.Dob}</td>
                    <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                    <td>${value.Address}</td>
                    <td>${value.State}</td>
                    <td>${value.Pin}</td>
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                    </td>
                </tr>`
                )
    
    
            })

        }
    })
})



$("#cnt-search").on("click",function(){

    let center=$('input[name="cnt"]:checked').val();
    $.ajax({
        
        url:`http://localhost:1234/centersearch?center=${center}`,
        type: 'GET',
        dataType: "json",
        // data:{query:val},
    
        success: function(res){
            $("#tbody").html('')
            console.log(res.response)
            if(res.response.length==0){
                $("#tbody").append(
                    `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                       
                        
                        
        
                        
                    </tr>`
                    )
                    return

            }
            res.response.sort((a, b) => {
                return b.ID - a.ID;
            });
            $.each(res.response,function(key,value){
                $("#tbody").append(
                `<tr>
                    <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                    <td>${value.Fname}</td>
                    <td>${value.Lname}</td>
                    <td>${value.Fam_id}</td>
                    <td>${value.Phone}</td>
                    <td>${value.Email}</td>
                    
                    <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                    <td>${value.Dob}</td>
                    <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                    <td>${value.Address}</td>
                    <td>${value.State}</td>
                    <td>${value.Pin}</td>
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                    </td>
                </tr>`
                )
    
    
            })

        }
    })
})




$("#gender-reset").on("click",function(){
    load();
    $("#glbsearch").val('')
})


$("#state-search").on("click",function(){

    let state=$("#inputState").val()
    // alert(state)
    if(state=='Please Select State'){
        return
    }
    $.ajax({
        
        url:`http://localhost:1234/statesearch?state=${state}`,
        type: 'GET',
        dataType: "json",
        // data:{query:val},
    
        success: function(res){
            $("#tbody").html('')
            if(res.response.length==0){
                $("#tbody").append(
                    `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                       
                        
                        
        
                        
                    </tr>`
                    )
                    return

            }
            console.log(res.response)
            res.response.sort((a, b) => {
                return b.ID - a.ID;
            });
            $.each(res.response,function(key,value){
                $("#tbody").append(
                `<tr>
                    <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                    <td>${value.Fname}</td>
                    <td>${value.Lname}</td>
                    <td>${value.Fam_id}</td>
                    <td>${value.Phone}</td>
                    <td>${value.Email}</td>
                    
                    <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                    <td>${value.Dob}</td>
                    <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                    <td>${value.Address}</td>
                    <td>${value.State}</td>
                    <td>${value.Pin}</td>
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                    </td>
                </tr>`
                )
    
    
            })

        }
    })
})


$("#age-search").on("click",function(){

let val1=$("#range1").val()
let val2=$("#range2").val()
    $.ajax({
        
        url:`http://localhost:1234/agesearch?age1=${val1}&age2=${val2}`,
        type: 'GET',
        dataType: "json",
        // data:{query:val},
    
        success: function(res){
            $("#tbody").html('')
            console.log(res.response)
            if(res.response.length==0){
                $("#tbody").append(
                    `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                       
                        
                        
        
                        
                    </tr>`
                    )
                    return

            }
            res.response.sort((a, b) => {
                return b.ID - a.ID;
            });
            $.each(res.response,function(key,value){
                $("#tbody").append(
                `<tr>
                    <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                    <td>${value.Fname}</td>
                    <td>${value.Lname}</td>
                    <td>${value.Fam_id}</td>
                    <td>${value.Phone}</td>
                    <td>${value.Email}</td>
                    
                    <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                    <td>${value.Dob}</td>
                    <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                    <td>${value.Address}</td>
                    <td>${value.State}</td>
                    <td>${value.Pin}</td>
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                    </td>
                </tr>`
                )
    
    
            })

        }
    })
})

$("#search-famid").focus(function(){
    $("#search-name").val('')
})
$("#search-name").focus(function(){
    $("#search-famid").val('')
})


$("#fam-search").on("click",function(){

    let val1=$("#search-famid").val()
    let val2=$("#search-name").val()
    let query=''
    let val=''
    if(val1==''){
        query=1
        val=val2
    }
    else{
        query=0
        val=val1
    }
    // alert(val)
        $.ajax({
            
            url:`http://localhost:1234/famsearch?fam=${val}&query=${query}`,
            type: 'GET',
            dataType: "json",
            // data:{query:val},
        
            success: function(res){
                $("#tbody").html('')
                console.log(res.response)
                if(res.response.length==0){
                    $("#tbody").append(
                        `<tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                           
                            
                            
            
                            
                        </tr>`
                        )
                        return
    
                }
                res.response.sort((a, b) => {
                    return b.ID - a.ID;
                });
                $.each(res.response,function(key,value){
                    $("#tbody").append(
                    `<tr>
                        <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                        <td>${value.Fname}</td>
                        <td>${value.Lname}</td>
                        <td>${value.Fam_id}</td>
                        <td>${value.Phone}</td>
                        <td>${value.Email}</td>
                        
                        <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                        <td>${value.Dob}</td>
                        <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                        <td>${value.Address}</td>
                        <td>${value.State}</td>
                        <td>${value.Pin}</td>
        
                        <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                        </td>
                    </tr>`
                    )
        
        
                })
    
            }
        })
    })

function ym(v){

   
   return (v.split("/").reverse().join("-"))
}

    $("#date-search").on("click",function(){

        let val1=$("#mfrom").val()
        let val2=$("#mto").val()
        val1=ym(val1)
        val2=ym(val2)
      
            $.ajax({
                
                url:`http://localhost:1234/datesearch?from=${val1}&to=${val2}`,
                type: 'GET',
                dataType: "json",
                // data:{query:val},
            
                success: function(res){
                    $("#tbody").html('')
                    console.log(res.response)
                    if(res.response.length==0){
                        $("#tbody").append(
                            `<tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                               
                                
                                
                
                                
                            </tr>`
                            )
                            return
        
                    }
                    res.response.sort((a, b) => {
                        return b.ID - a.ID;
                    });
                    $.each(res.response,function(key,value){
                        $("#tbody").append(
                        `<tr>
                            <td><a href="view.html?uid=${value.UID}"><img id="viewimg" class="mr-3 rounded-circle" src="${value.Profile}" alt=""></td>
                            <td>${value.Fname}</td>
                            <td>${value.Lname}</td>
                            <td>${value.Fam_id}</td>
                            <td>${value.Phone}</td>
                            <td>${value.Email}</td>
                            
                            <td><span class="label gradient-1 btn-rounded">${value.Age}</span></td>
                            <td>${value.Dob}</td>
                            <td><span class="label gradient-1 btn-rounded">${value.Gender}</span></td>
                            <td>${value.Address}</td>
                            <td>${value.State}</td>
                            <td>${value.Pin}</td>
            
                            <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a> </span>
                            </td>
                        </tr>`
                        )
            
            
                    })
        
                }
            })
        })
    


})