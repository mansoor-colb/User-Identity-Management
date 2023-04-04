var female='';
var male='';
var trans='';
var years=[]
$(document).ready(function () {
    if(!(localStorage.getItem('centerid'))){
        window.location.href='login.html'

    }
    


    $("#html5-qrcode-button-camera-stop").on('click',function(){
        $("#html5-qrcode-anchor-scan-type-change").hide();
        $("#html5-qrcode-button-camera-start").addClass('.btn mb-1 btn-primary');

    })
    $("#html5-qrcode-button-camera-permission").addClass('btn mb-1 btn-primary');
    $("#html5-qrcode-anchor-scan-type-change").hide();
    
   


    
   

    async function load(){
        // alert("kk")
        $("#tbody").html('')
        await fetch('/fetch6')
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
    
                    <td><span><a href="edit.html?uid=${value.UID}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i> </a></span>
                    </td>
                </tr>`
                )
    
    
            })
            
            
            
            // console.log(data)
        })
    
    }
    load()


});
(function($) {
    async function call(){
        let maill="qwweoekd"
        let otpval=888
        // alert("hy11y");
        await fetch('/pop') .then(response => response.json())
        .then(data =>{
           
             male=new Array(data.response[0].Total.length).fill(0)
             female=new Array(data.response[0].Total.length).fill(0)
             trans=new Array(data.response[0].Total.length).fill(0)
            for (let [ind,year] of data.response[0].Total.entries()){

                years.push(year.YEAR)
                for(let fem of data.response[1].female){
                    if(fem.yearf==year.YEAR){
                        female[ind]=(fem.count*10)

                    }
                }
                for(let ml of data.response[2].male){
                    if(ml.yearm==year.YEAR){
                        male[ind]=ml.count*10

                    }
                }
                for(let tr of data.response[3].trans){
                    if(tr.yeart==year.YEAR){
                        trans[ind]=tr.count*10

                    }
                }

            } 
            $("#fromto").html(`${years[0]}-${years[years.length-1]}`)
            $("#users").html(`${data.response[4].user[0].totaluser}`)
            $("#tfemale").html(`${data.response[5].category[0].c}`)
            $("#tmale").html(`${data.response[5].category[1].c}`)
            $("#ttrans").html(`${data.response[5].category[2].c}`)
            console.log(years)
            console.log(female)
            console.log(male)
            console.log(trans)
            console.log()
            let state=[];
            let statevalue=[];
            for(let stat of data.response[6].state){

                state.push(stat.State)
                statevalue.push(stat.st)
            }
            console.log(data.response)
            TESTER = document.getElementById('tester');
            Plotly.newPlot( TESTER, [{
                type: 'bar',
                
            x: state,
            y: statevalue }],
            {margin: { t: 0 } } );
         })
        
 
        //     $.ajax(`http://localhost:1234/validateotp?mail=${maill}&otpval=${otpvalue} `, {
        //         type: 'GET',
        //         dataType: 'json',
        
        //     success: function(res){
        //         console.log(res)
        //     }
        // })
    
    "use strict"

    let ctx = document.getElementById("chart_widget_2");
    ctx.height = 280;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                data: female,
                label: "Female",
                backgroundColor: '#847DFA',
                borderColor: '#847DFA',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#847DFA',
            }, {
                label: "Male",
                data: male,
                backgroundColor: '#F196B0',
                borderColor: '#F196B0',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#F196B0',
            },
            {
                label: "Trans",
                data: trans,
                backgroundColor: '#ffad6c',
                borderColor: '#F196B0',
                borderWidth: 0.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#ffad6c',
            }]
        },
        options: {
            responsive: !0,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });


    
}
call()

})(jQuery);
