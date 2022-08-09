
var Login = document.getElementById("login");

var Secondary = document.getElementById("createNewAccount");
Secondary.style.display='none'

var createNewAccount = document.getElementById("createNewAccount");
createNewAccount.style.display='none';

var CustomerForm = document.getElementById('customerForm');
CustomerForm.style.display='none'

var PlaceOrder = document.getElementById("PlaceOrder");
PlaceOrder.style.display='none';

var Main = document.getElementById("main");

var btnBackToDashBoard = document.getElementById('btnBackToDashBoard');
btnBackToDashBoard.style.display='block'

var btnCreateNewCustomer = document.getElementById('btnCreateNewAccount');


btnCreateNewCustomer.addEventListener('click',function () {
    Main.style.display='none';
    Secondary.style.display='block'
    generateCustomerId();
})

/*---------------------Login Customer------------------------*/

$('#btnLoginCustomer').click(function () {
    let id = $('#cusId').val();
    let password = $('#cusPassword').val();

    $('#navBarCusId').val(id);

    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/customer/search/${id}/${password}`,

        success:function (resp) {
            if (resp.password==password){
                Login.style.display='none';
                CustomerForm.style.display='block'
                loadAllRqForCID();
                generateRequestId();
                getAllCarID();

            }else {
                alert("Chek Karapan!")
            }
            console.log(resp.password)
        },
        error:function (resp) {
            alert("Check and Try again!")
        }
    })
})

/*---------------------Register Customer------------------------*/

$('#btnRegister').click(function () {
    let id = $('#customerID').val();
    let name = $('#customerName').val();
    let email = $('#email').val();
    let contactNumber = $('#contactNumber').val();
    let address = $('#address').val();
    let drivingLicenseNumber = $('#drivingLicenseNumber').val();
    let drivingLicenseImg = $('#drivenLicense').val();
    let nicNumber = $('#nicNumber').val();
    let nicImg = $('#nic').val();
    let password = $('#password').val();

    console.log(id)

    $.ajax({
        method:"POST",
        url:"http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/customer",
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            id:id,
            address:address,
            contactNumber:contactNumber,
            drivingLicenseImg:drivingLicenseImg,
            drivingLicenseNumber:drivingLicenseNumber,
            email:email,
            name:name,
            nicImg:nicImg,
            nicNumber:nicNumber,
            password:password
        }),
        success:function (data) {
            console.log(data)
            console.log(massage)
            console.log(code)
            Login.style.display='block';
            Secondary.style.display='none'
        },
        error:function (response) {
            alert(response.responseJSON.data)
            console.log(response.responseJSON.data)
        }
    })
})

function generateCustomerId () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/customer',
        success:function (resp) {
            let response=resp.data
            let lastId = response[response.length-1].id;
            let val = $('#customerID').val("C00" + (parseInt(lastId.split('C00')[1])+1));
            console.log(val)
        }
    })
}

let customerIdRegEx = /^(C0)[0-9]{1,2}$/;
let customerNameRegEx = /^[A-z]{1,}$/;
let customerEmailRegEx = /^[a-z]{1,}[@]{1}[a-z]{1,}[.]{1}[a-z]{1,}$/;
let customerContactNumberRegEx = /^[0-9]{1,10}$/;
let customerAddressRegEx = /^[A-z]{1,}\s|[A-z]{1,}$/;
let customerDrivingLicenseRegEx = /^[0-9]{1,}$/;
let customerNICNumberRegEx = /^[0-9]{1,}$/;
let customerPasswordRegEx = /^[A-Z]{1}[a-x]{2,6}$/;

$('#customerID').on('keydown',function (event) {
    $('#lblCustomerID').text('CustomerID is a required  : (C001)');
    if (event.key=="Enter"){
        $('#customerName').focus();
    }

    var inputCustomerID = $('#customerID').val();
    console.log(inputCustomerID)
    if (customerIdRegEx.test(inputCustomerID)){
        console.log("true")
        if (cusIDChecker()){
            $("#lblCustomerID").text("");
            console.log("iug")
        }else {
            $('#customerID').css('border', '2px solid blue');
            $("#lblCustomerID").text("");
            console.log("iug")
        }
    }else {
        $('#customerID').css('border', '2px solid red');
        $("#lblCustomerID").text("Aulk Thynw !");
    }
})

$('#customerName').on('keydown',function (event) {
    $('#lblCustomerName').text('CustomerName is a required  : (A-z )');
    if (event.key=="Enter"){
        $('#email').focus();
        $('#lblEmail').text('Email is a required  : (sample@sample.sample)');
    }

    var inputCustomerName = $('#customerName').val();
    if (customerNameRegEx.test(inputCustomerName)){
        console.log("true")
        if (cusIDChecker()){
            $("#lblCustomerName").text("");
        }else {
            $('#customerName').css('border', '2px solid blue');
            $("#lblCustomerName").text("");
        }
    }else {
        $('#customerName').css('border', '2px solid red');
        $("#lblCustomerName").text("Aulk Thynw !");
    }
})

$('#email').on('keydown',function (event) {
    if (event.key=="Enter"){
        $('#contactNumber').focus();
        $('#lblNumber').text('Contact is a required  : (07********)');
    }

    var inputCustomerEmail = $('#email').val();
    if (customerEmailRegEx.test(inputCustomerEmail)){
        if (cusIDChecker()){
            $("#lblEmail").text("");
        }else {
            $('#email').css('border', '2px solid blue');
            $("#lblEmail").text("");
        }
    }else {
        $('#email').css('border', '2px solid red');
        $("#lblEmail").text("Aulk Thynw !");
    }
})

$('#contactNumber').on('keydown',function (event) {
    if (event.key=="Enter"){
        $('#address').focus();
        $('#lblAddress').text('Address is a required  : (A-z)');
    }

    var inputCustomerContactNumber = $('#contactNumber').val();
    if (customerContactNumberRegEx.test(inputCustomerContactNumber)){
        if (cusIDChecker()){
            $("#lblNumber").text("");
        }else {
            $('#contactNumber').css('border', '2px solid blue');
            $("#lblNumber").text("");
        }
    }else {
        $('#contactNumber').css('border', '2px solid red');
        $("#lblNumber").text("Aulk Thynw !");
    }
})

$('#address').on('keydown',function (event) {
    if (event.key=="Enter"){
        $('#drivingLicenseNumber').focus();
        $('#lblDrivingLicenseNumber').text('Driving License Number is a required  : (0-9)');
    }

    var inputCustomerAddress = $('#address').val();
    if (customerAddressRegEx.test(inputCustomerAddress)){
        if (cusIDChecker()){
            $("#lblAddress").text("");
        }else {
            $('#address').css('border', '2px solid blue');
            $("#lblAddress").text("");
        }
    }else {
        $('#address').css('border', '2px solid red');
        $("#lblAddress").text("Aulk Thynw !");
    }
})

$('#drivingLicenseNumber').on('keydown',function (event) {
    if (event.key=="Enter"){
        $('#drivenLicense').focus();
    }

    var inputCustomerLicenseNumber = $('#drivingLicenseNumber').val();
    if (customerDrivingLicenseRegEx.test(inputCustomerLicenseNumber)){
        if (cusIDChecker()){
            $("#lblDrivingLicenseNumber").text("");
        }else {
            $('#drivingLicenseNumber').css('border', '2px solid blue');
            $("#lblDrivingLicenseNumber").text("");
        }
    }else {
        $('#drivingLicenseNumber').css('border', '2px solid red');
        $("#lblDrivingLicenseNumber").text("Aulk Thynw !");
    }
})

$('#nicNumber').on('keydown',function (event) {
    $("#lblNicNumber").text('NIC is a required  : (0-9)');
    if (event.key=="Enter"){
        $('nic').focus();
    }

    var inputCustomerNICNumber = $('#nicNumber').val();
    if (customerNICNumberRegEx.test(inputCustomerNICNumber)){
        if (cusIDChecker()){
            $("#lblNicNumber").text("");
        }else {
            $('#nicNumber').css('border', '2px solid blue');
            $("#lblNicNumber").text("");
        }
    }else {
        $('#nicNumber').css('border', '2px solid red');
        $("#lblNicNumber").text("Aulk Thynw !");
    }
})

$('#password').on('keydown',function (event) {
    $("#lblPassword").text('Password is a required  : (First Letter Capital and some simple Letters)');
    if (event.key=="Enter"){
        $('#btnRegister').focus();
    }

    var inputCustomerPassword = $('#password').val();
    if (customerPasswordRegEx.test(inputCustomerPassword)){
        if (cusIDChecker()){
            $("#lblPassword").text("");
        }else {
            $('#password').css('border', '2px solid blue');
            $("#lblPassword").text("");
        }
    }else {
        $('#password').css('border', '2px solid red');
        $("#lblPassword").text("Aulk Thynw !");
    }
})

function cusIDChecker(cusID){
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/customer`,

        success:function (resp) {
            let response=resp.data
            console.log(response.cusId)
        }
    })
}

/*---------------------Send request------------------------*/

$('#btnRequest').click(function () {
    let reqID = $('#navBarRqId').val();
    let cusID = $('#navBarCusId').val();
    let withDriverOrWithOutDriver = $('#withDriverOrWithOutDriver').val();
    let pickupLocation = $('#pickupLocation').val();
    let pickUpDate = $('#pickupDate').val();
    let pickUpTime = $('#pickupTime').val();
    let returnDate = $('#returnDate').val();
    let carId = $('#carId').val();
    let vehicleType = $('#vehicleType').val();

    // console.log(reqID)
    // console.log(cusID)
    // console.log(withDriverOrWithOutDriver)
    // console.log(pickupLocation)
    // console.log(pickUpDate)
    // console.log(pickUpTime)
    // console.log(returnDate)
    // console.log(vehicleType)
    // console.log(carId)

    $.ajax({
        method:'POST',
        url:"http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            reqId: reqID,
            withDriverOrWithOutDriver: withDriverOrWithOutDriver,
            pickupLocation: pickupLocation,
            pickupDate: pickUpDate,
            pickupTime: pickUpTime,
            returnDate: returnDate,
            vehicleType: vehicleType,
            acceptOrReject:"Pending",
            cus_ID: {id:cusID},
            car_ID:{registrationNumber:carId},
            driver_ID: {driverID:"Pending"}
        }),
        success:function (data) {
            $('#tblRentalRequest').empty();
            loadAllRqForCID();
            generateRequestId();
            clearText()
            alert("Requet eka Giya.obata pilithurak ikmanin lebei")
        },
        error:function (data) {
            alert(data)
        }
    })
    loadAllRqForCID();
})

$('#btnUpdate').click(function () {
    getAcceptOrRejectValues();
})
/*
$('#carId').click(function () {
    setType();
})*/

$('#withDriverOrWithOutDriver').on('keydown',function () {
    $('#lblWithDriverOrWithOutDriver').text('With Driver Or WithOut Driver is a required  : (A-z)')
    if (event.key=="Enter"){
        $('#pickupLocation').focus();
        $('#lblRqPickupLocation').text('PickUp Location is a required  : (A-z)')
    }

    var inputwithDriverOrWithOutDriver = $('#withDriverOrWithOutDriver').val();
    if (withDriverOrWithOutDriverRegEx.test(inputwithDriverOrWithOutDriver)){
        if (cusIDChecker()){
            $("#lblWithDriverOrWithOutDriver").text("");
        }else {
            $('#withDriverOrWithOutDriver').css('border', '2px solid blue');
            $("#lblWithDriverOrWithOutDriver").text("");
        }
    }else {
        $('#withDriverOrWithOutDriver').css('border', '2px solid red');
        $("#lblWithDriverOrWithOutDriver").text("Aulk Thynw !");
    }
})

$('#pickupLocation').on('keydown',function () {
    if (event.key=="Enter"){
        $('#pickupDate').focus();
    }

    var inputPickUpLocation = $('#pickupLocation').val();
    if (pickupLocationRegEx.test(inputPickUpLocation)){
        if (cusIDChecker()){
            $("#lblRqPickupLocation").text("");
        }else {
            $('#pickupLocation').css('border', '2px solid blue');
            $("#lblRqPickupLocation").text("");
        }
    }else {
        $('#pickupLocation').css('border', '2px solid red');
        $("#lblRqPickupLocation").text("Aulk Thynw !");
    }
})

$('#carId').on('keydown',function () {
    var inputCarId = $('#carId').val();
    if (carIDRegEx.test(inputCarId)){
        if (cusIDChecker()){
            $("#lblRqCarID").text("");
        }else {
            $('#carId').css('border', '2px solid blue');
            $("#lblRqCarId").text("");
        }
    }else {
        $('#carId').css('border', '2px solid red');
        $("#lblRqCarId").text("Aulk Thynw !");
    }
})

function getAllCarID(){
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/`,
        success:function (resp) {
            let response=resp.data;
            for ( var i in response) {
                console.log(response[i].registrationNumber)
                let carID = response[i].registrationNumber
                $('#carId').append("<option>"+carID+ "</option>")
            }
        }
    })
}

function loadAllRqForCID () {
    $('#tblRentalRequest').empty();
    let cusID = $('#cusId').val();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/find/${cusID}/`,
        async:true,

        success:function (resp) {
            let re=resp.data
          /*  console.log(resp)*/
            $('#tblRentalRequest').empty();
            let response=resp.data
            for ( var i in response) {
                let reqId = (response[i].reqId)
                let cusId = (re[i].cus_ID.id)
                let withDriverOrWithOutDriver = (response[i].withDriverOrWithOutDriver)
                let pickupLocation = (response[i].pickupLocation)
                let pickupDate = (response[i].pickupDate)
                let pickupTime = (response[i].pickupTime)
                let returnDate = (response[i].returnDate)
                let vehicleType = (response[i].vehicleType)
                let carId = (re[i].car_ID.registrationNumber)
                let driverId = (re[i].driver_ID.driverID)
                let acceptOrReject = (response[i].acceptOrReject)

                /*console.log(reqId)
                console.log(cusId)
                console.log(withDriverOrWithOutDriver)
                console.log(pickupLocation)
                console.log(pickupDate)
                console.log(pickupTime)
                console.log(returnDate)
                console.log(vehicleType)
                console.log(driverId)
                console.log(acceptOrReject)*/

                if (acceptOrReject==="Accept"){
                    $('#btnPla')
                    var row = `<tr><td>${reqId}</td><td>${cusId}</td><td>${withDriverOrWithOutDriver}</td><td>${pickupDate}</td><td>${pickupLocation}</td><td>${pickupTime}</td><td>${returnDate}</td><td>${vehicleType}</td><td>${carId}</td><td>${driverId}</td><td>${acceptOrReject}<button class="btnPlaceOrder btn-success m-3">Place Order</button></td></tr>`;
                    $('#tblRentalRequest').append(row);
                }else if (acceptOrReject==="Reject"){
                    var row = `<tr><td>${reqId}</td><td>${cusId}</td><td>${withDriverOrWithOutDriver}</td><td>${pickupDate}</td><td>${pickupLocation}</td><td>${pickupTime}</td><td>${returnDate}</td><td>${vehicleType}</td><td>${carId}</td><td>${driverId}</td><td>${acceptOrReject}<button class="btnTryAgain btn-warning m-3">Try Again</button></td></tr>`;
                    $('#tblRentalRequest').append(row);
                }else {
                    var row = `<tr><td>${reqId}</td><td>${cusId}</td><td>${withDriverOrWithOutDriver}</td><td>${pickupDate}</td><td>${pickupLocation}</td><td>${pickupTime}</td><td>${returnDate}</td><td>${vehicleType}</td><td>${carId}</td><td>${driverId}</td><td>${acceptOrReject}</td></tr>`;
                    $('#tblRentalRequest').append(row);
                }
            }
        }
    })
}

$('.table tbody').on('click','.btnTryAgain', function () {
    $('#tblRentalRequest>tr').click(function () {
        let reqId = $(this).children('td:eq(0)').text();
        let cusId = $(this).children('td:eq(1)').text();
        let withDriverOrWithoutDriver = $(this).children('td:eq(2)').text();
        let pickUpDate = $(this).children('td:eq(3)').text();
        let pickUpLocation = $(this).children('td:eq(4)').text();
        let pickUpTime = $(this).children('td:eq(5)').text();
        let returnDate = $(this).children('td:eq(6)').text();
        let vehicleType = $(this).children('td:eq(7)').text();
        let carId = $(this).children('td:eq(8)').text();
        let driverId = $(this).children('td:eq(9)').text();
        let acceptOrReject = $(this).children('td:eq(10)').text();

     /*   console.log(reqId)
        console.log(withDriverOrWithoutDriver)
        console.log(pickUpDate)
        console.log(pickUpLocation)
        console.log(pickUpTime)
        console.log(returnDate)
        console.log(carId)
        console.log(vehicleType)*/


        $('#navBarRqId').val(reqId);
        $('#withDriverOrWithOutDriver').val(withDriverOrWithoutDriver);
        $('#pickupLocation').val(pickUpLocation);
        $('#pickupDate').val(pickUpDate);
        $('#pickupTime').val(pickUpTime);
        $('#returnDate').val(returnDate);
        $('#carId').val(carId);
        $('#vehicleType').val(vehicleType);
    })
})

function generateRequestId () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking',
        success:function (resp) {
            let response=resp.data
            let lastId = response[response.length-1].reqId;
            let val = $('#navBarRqId').val("R0" + (parseInt(lastId.split('R0')[1])+1));
            console.log(val)
        }
    })
}

function clearText () {
    $('#withDriverOrWithOutDriver').val("");
    $('#pickupLocation').val("");
    $('#pickupDate').val("");
    $('#pickupTime').val("");
    $('#returnDate').val("");
    $('#vehicleType').val("");
    $('#carId').val("");
}

function getAcceptOrRejectValues () {
    let acceptOrReject = $(this).children('td:eq(10)').text();
}

/*function loadAllCar () {
    $('#carId').empty();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/`,

        success : function (resp) {
            var response = resp.data;
            for ( var i in response) {
                var registrationNumber = response[i].registrationNumber;
                var type = response[i].carType;

                $('#carId').append("<option>"+registrationNumber+ "</option>");
            }
        }
    })
}*/

/*
function setType(){
    var carId = $('#carId').val();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/${carId}/`,
        success:function (resp) {
            let response = resp.data
            console.log(response.carType)
            $('#vehicleType').val(response.carType);
        }
    })
}
*/

let withDriverOrWithOutDriverRegEx = /^[A-z]{1,}( ){1}[A-z]{1,}$/;
let pickupLocationRegEx = /^[A-z]{1,}$/;
let carIDRegEx = /^(CA0)[0-9]{1,2}$/;

/*--------------------------Place Order-----------------------------*/

var btnPlaceOrder = document.getElementById('btnPlaceOrder');
btnPlaceOrder.style.display='none';

let contactNumberRegEx = /^[0-9]{10}$/;
let periodRegEx = /^[0-9]{1,}$/;

$('#poContactNumber').on('keydown',function () {
    $('#lblContactNumber').text('anka 10k danna');
    if (event.key=="Enter"){
        $('#period').focus();
        $('#lblPeriod').text('Masa Ganana /Dina ganana danna');
    }
    var inputContactNumber = $('#poContactNumber').val();
    if (contactNumberRegEx.test(inputContactNumber)){
        if (cusIDChecker()){
            $("#lblContactNumber").text("");
        }else {
            $('#poContactNumber').css('border', '2px solid blue');
            $("#lblContactNumber").text("");
        }
    }else {
        $('#poContactNumber').css('border', '2px solid red');
        $("#lblCustomerID").text("Aulk Thynw !");
    }
})
//
// $('#period').on('keydown',function () {
//     // if (event.key=="Enter"){
//     //     $('#btnOrderAdd').focus();
//     // }
//     var inputPeriod = $('#period').val();
//     if (periodRegEx.test(inputContactNumber)){
//         if (cusIDChecker()){
//             $("#lblPeriod").text("");
//         }else {
//             $('#period').css('border', '2px solid blue');
//             $("#lblPeriod").text("");
//             console.log("iug")
//         }
//     }else {
//         $('#period').css('border', '2px solid red');
//         $("#lblPeriod").text("Aulk Thynw !");
//     }
// })

$('.table tbody').on('click','.btnPlaceOrder', function () {
    $('#tblRentalRequest>tr').click(function () {
        console.log("pakoo")
        PlaceOrder.style.display='block';
        CustomerForm.style.display='none';
        let reqId = $(this).children('td:eq(0)').text();
        let cusId = $(this).children('td:eq(1)').text();
        let withDriverOrWithoutDriver = $(this).children('td:eq(2)').text();
        let pickUpDate = $(this).children('td:eq(3)').text();
        let pickUpLocation = $(this).children('td:eq(4)').text();
        let pickUpTime = $(this).children('td:eq(5)').text();
        let returnDate = $(this).children('td:eq(6)').text();
        let vehicleType = $(this).children('td:eq(7)').text();
        let carId = $(this).children('td:eq(8)').text();
        let driverId = $(this).children('td:eq(9)').text();
        let acceptOrReject = $(this).children('td:eq(10)').text();

        console.log(reqId)
        console.log(cusId)
        console.log(pickUpTime)
        console.log(pickUpDate)
        console.log(pickUpLocation)
        console.log(driverId)
        console.log(carId)

        $('#posReqID').val(reqId);
        $('#poCusID').val(cusId);
        $('#poPickUpTime').val(pickUpTime);
        $('#poPickUpDate').val(pickUpDate);
        $('#poPickUpLocation').val(pickUpLocation);
        $('#poDriverID').val(driverId);
        $('#poCarID').val(carId);
        loadACar();
        generateOrderId();
    })
})

$('#btnOrderAdd').click(function () {
    var orderId = $('#posOrderID').val();
    let reqID = $('#posReqID').val();
    let carID = $('#poCarID').val();
    let driverID = $('#poDriverID').val();
    let monthlyOrDaily = $('#monthlyOrDaily').val();
    let period = $('#period').val();
    let deposit = $('#depositMoney').val();
    let totBalance = $('#totalBalanceForCar').val();
    let contactNumber = $('#poContactNumber').val();


    var row = `<tr><td>${orderId}</td><td>${reqID}</td><td>${carID}</td><td>${driverID}</td><td>${monthlyOrDaily}</td><td>${period}</td><td>${deposit}</td><td>${totBalance}</td><td>${contactNumber}</td></tr>`;
    $('#tblPlaceOrder').append(row)

    btnPlaceOrder.style.display='block';
})

$('#btnPlaceOrder').click(function () {
    var orderId = $('#posOrderID').val();
    let reqID = $('#posReqID').val();
    let carID = $('#poCarID').val();
    let driverID = $('#poDriverID').val();
    let monthlyOrDaily = $('#monthlyOrDaily').val();
    let period = $('#period').val();
    let deposit = $('#depositMoney').val();
    let totBalance = $('#totalBalanceForCar').val();
    let contactNumber = $('#poContactNumber').val();

    $.ajax({
        method:'POST',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/placeOrder`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            orderID:orderId,
            contactNumber:contactNumber,
            depositMoney:deposit,
            monthlyOrDaily:monthlyOrDaily,
            period:period,
            totalValueForPeriod:totBalance,
            Car_ID:{registrationNumber:carID},
            req_ID: {reqId: reqID},
            Driver_ID:{driverID:driverID},

        }),
        success:function (response) {
            console.log(response)
            alert("Wede Goda Bill eke coppy ekak Mail ekat eewi")
        }
    })
})

function loadACar () {
    var CarID = $('#poCarID').val();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/${CarID}`,

        success : function (resp) {
            let response=resp.data
            console.log(response)

            $('#period').on('keydown' ,function (e) {
                    var x = $('#monthlyOrDaily').val();
                    if (x=="Monthly"){
                        let monthly = response.monthlyRate;
                        if(e.keyCode == 13){
                            var val = (monthly*($('#period').val()));
                            $('#totalBalanceForCar').val(`Total Rs. ${val}.00`);
                            $('#depositMoney').val(`Rs. ${val*2}.00`);
                        }
                        console.log(val)
                        console.log(monthly)
                    }else if (x=="Daily"){
                        var daily = response.daiLRate;
                        if(e.keyCode == 13){
                            var val = (daily*($('#period').val()));
                            $('#totalBalanceForCar').val(`Total Rs. ${val}.00`);
                            $('#depositMoney').val(`Rs. ${val*2}.00`);
                        }
                    }
            })
        }
    })
}

function generateOrderId () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/placeOrder',
        success:function (resp) {
            let response=resp.data
                let lastId = response[response.length-1].orderID;
                let val = $('#posOrderID').val("O00" + (parseInt(lastId.split('O00')[1])+1));
                console.log(val)
        }
    })
}



