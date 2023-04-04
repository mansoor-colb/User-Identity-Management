$(document).ready(function () {
  if(!(localStorage.getItem('centerid'))){
    window.location.href='login.html'

}
  let query = window.location.search;
  let url = new URLSearchParams(query);
  let val = url.get("uid");

  $.ajax({
    url: `http://localhost:1234/editsearch?uid=${val}`,
    type: "GET",
    dataType: "json",

    success: function (res) {
      console.log(res.response);
      if (res.response.length != 0) {
        $(".data").html(
          `<p>${res.response[0].Fname} ${res.response[0].Lname}</p> <p>${res.response[0].UID}</p><a href='edit.html?uid=${res.response[0].UID}'><button type="button" class="btn mb-1 btn-secondary">Edit</button></a>`
        );
        $("#bigimg").attr("src", `${res.response[0].Profile}`);
        $("#qrimg").attr(
          "src",
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${res.response[0].UID}`
        );
$("#address").append(`${res.response[0].Address}`)
        $("#uls").html(` <ul>
                <li><span>Date of Birth :</span>${res.response[0].Dob}</li>
                <li><span>Gender :</span>${res.response[0].Gender}</li>
                <li id="famrelation"><span>Family :</span>${res.response[0].Fam_id}</li>
                <li><span>Age           :</span>${res.response[0].Age}</li>
                <li><span>State          :</span>${res.response[0].State}</li>
                <li><span>Pincode           :</span>${res.response[0].Pin}</li>
                <li><span>Phone          :</span>${res.response[0].Phone}</li>
                <li><span>Mail          :</span>${res.response[0].Email}</li>
            </ul>`);

        $.ajax({
          url: `http://localhost:1234/familymembers?fam=${res.response[0].Fam_id}`,
          type: "GET",
          dataType: "json",

          success: function (res2) {
            console.log(res2.response);
            if (res2.response.length != 0) {
                $.each(res2.response,function(key,value){
                    if(value.UID!=res.response[0].UID){
                $(".row").append(` 
            <div class="col-lg-3 col-sm-6" id="memberimg">
            <a style="text-decoration:none" href="view.html?uid=${value.UID}">
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                       <img src="${value.Profile}" class="rounded-circle" alt="">
                        <h5 class="mt-3 mb-1">${value.Fname} ${value.Lname}</h5>
                        <p class="m-0">${value.Relation}</p>
                    </div>
                </div>
            </div>
            </a>
        </div>
        
                
                
                `)
                }
                else{
                    $("#famrelation").append(` (${value.Relation})`)

                }
                })


            }
          },
        });
      } else {
        alert("No user Exist");
      }
    },
  });
});
