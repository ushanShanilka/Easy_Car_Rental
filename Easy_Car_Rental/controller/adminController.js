var defaultPage = document.getElementById('defaultPage');

var managerCar = document.getElementById("manageCar");
managerCar.style.display='none';

var rentalRequest = document.getElementById("rentalRequest");
rentalRequest.style.display='none';

var driverManage = document.getElementById("driverManage");
driverManage.style.display='none';

var bookingDetails = document.getElementById('bookingDetails');
bookingDetails.style.display='none'

var In = document.getElementById('in');
In.style.display='none'

var btnCarManager = document.getElementById('btnCarManager')

var btnRentalRequest = document.getElementById('btnRentalRequest');

var btnDriverManage = document.getElementById('btnDriverManage');

var btnSaveDriver = document.getElementById('btnSaveDriver');

var btnDefault = document.getElementById('btnDefaultPage');

var Admin = document.getElementById('navBarAdmin');

var btnBookingDetails = document.getElementById('btnBookingDetails');

var ManageCar = document.getElementById('navBarManageCar');
ManageCar.style.display='none';

var RentalRq = document.getElementById('navBarRentalRq');
RentalRq.style.display='none';

var ManageDriver = document.getElementById('navBarDriverManage');
ManageDriver.style.display='none';

var BookingDatails = document.getElementById('navBarDriverManageBookingDetails');
BookingDatails.style.display='none'

btnDefault.addEventListener("click" , function () {
    defaultPage.style.display='block';
    managerCar.style.display='none';
    driverManage.style.display='none';
    Admin.style.display='block'
    ManageCar.style.display='none'
    ManageDriver.style.display='none'
    RentalRq.style.display='none'
    rentalRequest.style.display='none';
    BookingDatails.style.display='none'
    bookingDetails.style.display='none'
})

btnDriverManage.addEventListener("click" , function () {
    defaultPage.style.display='none';
    managerCar.style.display='none';
    driverManage.style.display='block';
    rentalRequest.style.display='none';
    Admin.style.display='none'
    ManageDriver.style.display='block'
    ManageCar.style.display='none'
    RentalRq.style.display='none'
    BookingDatails.style.display='none'
    bookingDetails.style.display='none'
    loadAllDrivers ();
    generateDriverId();

})

btnCarManager.addEventListener('click',function () {
    defaultPage.style.display='none';
    managerCar.style.display='block';
    driverManage.style.display='none'
    Admin.style.display='none'
    ManageCar.style.display='block'
    RentalRq.style.display='none'
    ManageDriver.style.display='none'
    rentalRequest.style.display='none';
    BookingDatails.style.display='none'
    bookingDetails.style.display='none'
    loadAllCars();
    generateCarId();
})

btnRentalRequest.addEventListener('click',function () {
    defaultPage.style.display='none';
    managerCar.style.display='none';
    rentalRequest.style.display='block';
    Admin.style.display='none'
    ManageCar.style.display='none'
    RentalRq.style.display='block'
    ManageDriver.style.display='none'
    driverManage.style.display='none'
    BookingDatails.style.display='none'
    bookingDetails.style.display='none'
    loadAllRequest();
    clickRequestTblRow();
})

btnBookingDetails.addEventListener("click" , function () {
    defaultPage.style.display='none';
    managerCar.style.display='none';
    rentalRequest.style.display='none';
    Admin.style.display='none'
    ManageCar.style.display='none'
    RentalRq.style.display='none'
    ManageDriver.style.display='none'
    driverManage.style.display='none'
    BookingDatails.style.display='block'
    bookingDetails.style.display='block'
})

$('#btnBackToAdminPage').click(function () {
    defaultPage.style.display='block';
    managerCar.style.display='none';
    rentalRequest.style.display='none';
    btnBackToAdminPage.style.display='none'
    In.style.display='block'
    Admin.style.display='block'
    ManageCar.style.display='none'
    ManageDriver.style.display='none'
    RentalRq.style.display='none'
    driverManage.style.display='none';
});

var Login = document.getElementById('login');

var In = document.getElementById('in');

/*--------------------------Admin Login------------------------------*/

$('#btnAdminLogin').click(function () {
    let userName = $('#userName').val();
    let password = $('#password').val();

    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/admin/search/${userName}/${password}`,

        success:function (response) {
            if (response.password==password){
                Login.style.display='none';
                In.style.display='block'
            }else {
                alert("Please Che Your User Name And Password")
            }
        }
    })
})

/*--------------------------Request------------------------------*/

$('#btnLoad').click(function () {
    clickRequestTblRow();
})

$('#btnSend').click(function () {
    let reqId = $('#requestID').val();
    let cusId = $('#cusId').val();
    let withOrWithOut = $('#with').val();
    let reqDriverId = $('#rqDriverId').val();
    let pickupLocation = $('#pickUpLocation').val();
    let pickupDate = $('#picUpDate').val();
    let pickupTime = $('#picUpTime').val();
    let returnDate = $('#returnDate').val();
    let vehicleType = $('#vehicleType').val();
    let carId = $('#RqCarId').val();
    let acceptOrReject = $('#acceptOrRejected').val();

    $.ajax({
        method:'PUT',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/`,
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            reqId:reqId,
            withDriverOrWithOutDriver:withOrWithOut,
            pickupDate:pickupDate,
            pickupLocation:pickupLocation,
            pickupTime:pickupTime,
            acceptOrReject:acceptOrReject,
            returnDate:returnDate,
            vehicleType:vehicleType,
            cus_ID: {id:cusId},
            car_ID:{registrationNumber:carId},
            driver_ID: {driverID:reqDriverId}
        }),
        success:function (data) {
            console.log(data)
            alert("Eya Giya !")
            clearRequestText();
            loadAllRequest();
        }
    })
})

function clickRequestTblRow () {
    $('#tblRentalRequest>tr').click(function () {
        let reqId = $(this).children('td:eq(0)').text();
        let cusId = $(this).children('td:eq(1)').text();
        let withDriverOrWithOutDriver = $(this).children('td:eq(2)').text();
        let pickUpDate = $(this).children('td:eq(3)').text();
        let pickupLocation = $(this).children('td:eq(4)').text();
        let pickUpTime = $(this).children('td:eq(5)').text();
        let returnDate = $(this).children('td:eq(6)').text();
        let vehicleType = $(this).children('td:eq(7)').text();
        let carId = $(this).children('td:eq(8)').text();
        let driverId = $(this).children('td:eq(9)').text();
        let acceptOrrReject = $(this).children('td:eq(10)').text();

        console.log("Req ID :"+reqId)
        console.log("cusId :"+cusId)
        console.log("withDriverOrWithOutDriver  :"+withDriverOrWithOutDriver)
        console.log("pickUpDate :"+pickUpDate)
        console.log("pickupLocation :"+pickupLocation)
        console.log("pickUpDate :"+pickUpDate)
        console.log("pickUpTime :"+pickUpTime)
        console.log("returnDate :"+returnDate)
        console.log("vehicleType :"+vehicleType)
        console.log("RqCarId :"+carId)
        console.log("driverId :"+driverId)
        console.log("acceptOrrReject :"+acceptOrrReject)


        $('#requestID').val(reqId);
        $('#cusId').val(cusId);
        $('#with').val(withDriverOrWithOutDriver);
        $('#rqDriverId').val(driverId);
        $('#pickUpLocation').val(pickupLocation);
        $('#picUpDate').val(pickUpDate);
        $('#picUpTime').val(pickUpTime);
        $('#returnDate').val(returnDate);
        $('#vehicleType').val(vehicleType);
        $('#RqCarId').val(carId);
        $('#acceptOrRejected').val(acceptOrrReject);

    })
}
$('#btnPlaceOrder')

function clearRequestText(){
    $('#requestID').val("reqId");
    $('#cusId').val("");
    $('#with').val("");
    $('#rqDriverId').val("");
    $('#pickUpLocation').val("");
    $('#picUpDate').val("");
    $('#picUpTime').val("");
    $('#returnDate').val("");
    $('#vehicleType').val("");
    $('#carID').val("");
    $('#acceptOrRejected').val("");
}

function loadAllRequest(){
    $('#tblRentalRequest').empty();
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/Pending/Pending/',
        success:function (resp) {
            let response= resp.data;
            for (var i in response ){
                let reqId = (response[i].reqId);
                let cusId = response[i].cus_ID.id;
                let withDriverOrWithOutDriver = response[i].withDriverOrWithOutDriver;
                let driverId = response[i].driver_ID.driverID;
                let pickupDate = response[i].pickupDate;
                let pickupLocation = response[i].pickupLocation;
                let pickupTime = response[i].pickupTime;
                let returnDate = response[i].returnDate;
                let vehicleType = response[i].vehicleType;
                let carId = response[i].car_ID.registrationNumber;
                let acceptOrReject = response[i].acceptOrReject;

            /*    console.log(response)
                console.log(response[i].cus_ID.id)*/

                var row = `<tr><td>${reqId}</td><td>${cusId}</td><td>${withDriverOrWithOutDriver}</td><td>${pickupDate}</td><td>${pickupLocation}</td><td>${pickupTime}</td><td>${returnDate}</td><td>${vehicleType}</td><td>${carId}</td><td><select class="driverId form-select"></td><td>${acceptOrReject}</td><td><button class="btnAccept btn-success m-3">Accept</button></td><td><button class="btnReject btn-warning m-3">Reject</button></td></tr>`;
                $('#tblRentalRequest').append(row);

            }
            loadAllDriverId();
        }
    })


}

function loadAllDriverId(){
    $('driverId').empty();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver/`,
        success:function (resp) {
            let response=resp.data;
            for ( var i in response) {

                let driverID = response[i].driverID
                /*console.log(driverID)*/
                $('.driverId').append("<option>"+driverID+ "</option>")
            }

        }
    })
}

$('.table tbody').on('click','driverId', function () {
    $('#tblRentalRequest>tr').click(function () {

       /* let val = $((this).('driverId').val();*/
        //console.log(val)
    })
})

$('.table tbody').on('click','.btnAccept', function () {
    $('#tblRentalRequest>tr').click(function () {

        let driverId = $('.driverId').val();
        console.log(driverId)
        let reqId = $(this).children('td:eq(0)').text();
        let cusId = $(this).children('td:eq(1)').text();
        let wdw = $(this).children('td:eq(2)').text();
        let picUpDate = $(this).children('td:eq(3)').text();
        let pickUpLocation = $(this).children('td:eq(4)').text();
        let picUpTime = $(this).children('td:eq(5)').text();
        let returnDate = $(this).children('td:eq(6)').text();
        let vehicleType = $(this).children('td:eq(7)').text();
        let carId = $(this).children('td:eq(8)').text();
        //let driverId = $(this).children('.driverId').text();
        let acceptOrReject = $(this).children('td:eq(10)').text();

      /*  console.log(reqId)
        console.log(cusId)
        console.log(wdw)
        console.log(picUpDate)
        console.log(pickUpLocation)
        console.log(picUpTime)
        console.log(returnDate)
        console.log(vehicleType)
        console.log(carId)*/
        console.log(driverId)
/*        console.log(acceptOrReject)*/

        $.ajax({
            method:'PUT',
            url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/`,
            contentType: 'application/json',
            async: true,
            data: JSON.stringify({
                reqId:reqId,
                withDriverOrWithOutDriver:wdw,
                pickupDate:picUpDate,
                pickupLocation:pickUpLocation,
                pickupTime:picUpTime,
                acceptOrReject:'Accept',
                returnDate:returnDate,
                vehicleType:vehicleType,
                cus_ID: {id:cusId},
                car_ID:{registrationNumber:carId},
                driver_ID: {driverID:driverId}
            }),
            success:function (data) {
                console.log(data)
                alert("Eya Giya !")
                clearRequestText();
                loadAllRequest();
            }
        })

    })
})

$('.table tbody').on('click','.btnReject', function () {
    $('#tblRentalRequest>tr').click(function () {

        let driverId = $('.driverId').val();
        console.log(driverId)

        let reqId = $(this).children('td:eq(0)').text();
        let cusId = $(this).children('td:eq(1)').text();
        let wdw = $(this).children('td:eq(2)').text();
        let picUpDate = $(this).children('td:eq(3)').text();
        let pickUpLocation = $(this).children('td:eq(4)').text();
        let picUpTime = $(this).children('td:eq(5)').text();
        let returnDate = $(this).children('td:eq(6)').text();
        let vehicleType = $(this).children('td:eq(7)').text();
        let carId = $(this).children('td:eq(8)').text();
        //let driverId = $(this).children('td:eq(9)').text();
        let acceptOrReject = $(this).children('td:eq(10)').text();

      /*  console.log(reqId)
        console.log(cusId)
        console.log(wdw)
        console.log(picUpDate)
        console.log(pickUpLocation)
        console.log(picUpTime)
        console.log(returnDate)
        console.log(vehicleType)
        console.log(carId)
        console.log(driverId)
        console.log(acceptOrReject)*/

        $.ajax({
            method:'PUT',
            url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/`,
            contentType: 'application/json',
            async: true,
            data: JSON.stringify({
                reqId:reqId,
                withDriverOrWithOutDriver:wdw,
                pickupDate:picUpDate,
                pickupLocation:pickUpLocation,
                pickupTime:picUpTime,
                acceptOrReject:'Reject',
                returnDate:returnDate,
                vehicleType:vehicleType,
                cus_ID: {id:cusId},
                car_ID:{registrationNumber:carId},
                driver_ID: {driverID:driverId}
            }),
            success:function (data) {
                console.log(data)
                alert("Eya Giya !")
                clearRequestText();
                loadAllRequest();
            }
        })


    })
})

/*--------------------Car Manage----------------------------*/

$('#btnSaveCar').click(function () {
    let carId = $('#carID').val();
    let brandName = $('#BrandName').val();
    let type = $('#Type').val();
    let frontView = $('#frontView').val();
    let backView = $('#backView').val();
    let sideView = $('#sideView').val();
    let interior = $('#interior').val();
    let numberOfPassengers = $('#NumberOfPassengers').val();
    let transmissionType = $('#TransmissionType').val();
    let fuelType = $('#FuelType').val();
    let dailyRate = $('#DailyRate').val();
    let monthlyRate = $('#MonthlyRate').val();
    let freeMileageForThePriceSndDuration = $('#FreeMileageForThePriceSndDuration').val();
    let priceForExtraKM = $('#PriceForExtraKM').val();
    let color = $('#Color').val();

    $.ajax({
        method:'POST',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            registrationNumber:carId,
            bradName :brandName,
            carType:type,
            img1:frontView,
            img2:backView,
            img3:sideView,
            img4:interior,
            numberOfPassenger:numberOfPassengers,
            transmissionType:transmissionType,
            fuelType:fuelType,
            daiLRate:dailyRate,
            monthlyRate:monthlyRate,
            freeMileageForThePriceAndDuration:freeMileageForThePriceSndDuration,
            priceOfExtraKm:priceForExtraKM,
            color:color

        }),
        success : function () {
            confirm(carId + " Save Karanna oonthe? ")
            loadAllCars();
            clearAll();
            cleartext();
            generateCarId();
        },
        error : function (resp) {
            let response=resp.massege
            alert(response + "Please Check Again!");
        }
    })
})

$('#btnCarUpdate').click(function () {
    let carId = $('#carID').val();
    let brandName = $('#BrandName').val();
    let type = $('#Type').val();
    let frontView = $('#frontView').val();
    let backView = $('#backView').val();
    let sideView = $('#sideView').val();
    let interior = $('#interior').val();
    let numberOfPassengers = $('#NumberOfPassengers').val();
    let transmissionType = $('#TransmissionType').val();
    let fuelType = $('#FuelType').val();
    let dailyRate = $('#DailyRate').val();
    let monthlyRate = $('#MonthlyRate').val();
    let freeMileageForThePriceSndDuration = $('#FreeMileageForThePriceSndDuration').val();
    let priceForExtraKM = $('#PriceForExtraKM').val();
    let color = $('#Color').val();

    $.ajax({
        method:'PUT',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            registrationNumber:carId,
            bradName :brandName,
            carType :type,
            img1:frontView,
            img2:backView,
            img3:sideView,
            img4:interior,
            numberOfPassenger:numberOfPassengers,
            transmissionType:transmissionType,
            fuelType:fuelType,
            daiLRate:dailyRate,
            monthlyRate:monthlyRate,
            freeMileageForThePriceAndDuration:freeMileageForThePriceSndDuration,
            priceOfExtraKm:priceForExtraKM,
            color:color

        }),
        success : function (response) {
            alert(carId + " Update Success ");
            loadAllCars();
            cleartext();
            generateCarId();
        },
        error : function (resp) {
            let response=resp.massage

            alert(response +"Please Check Again!");
        }
    })
})

$('#btnDeleteCar').click(function () {
    let carId = $('#carID').val();

    $.ajax({
        method:'DELETE',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/${carId}`,

        success : function () {
            confirm(carId + " Are You Sure?");
            loadAllCars();
            cleartext();
            generateCarId();
        },
        error : function (response) {
            let resp = response.massge;
            alert(resp);
        }
    })

})

$('#btnGetAll').click(function () {
    clickCarTblRow();
})

function clickCarTblRow(){
    $('#tblCar>tr').click(function () {
        let carId = $(this).children('td:eq(0)').text();
        let brand = $(this).children('td:eq(1)').text();
        let type = $(this).children('td:eq(2)').text();
        let front = $(this).children('td:eq(3)').text();
        let back = $(this).children('td:eq(4)').text();
        let side = $(this).children('td:eq(5)').text();
        let interior = $(this).children('td:eq(6)').text();
        let passengers = $(this).children('td:eq(7)').text();
        let trans = $(this).children('td:eq(8)').text();
        let fuelType = $(this).children('td:eq(9)').text();
        let dailyRate = $(this).children('td:eq(10)').text();
        let monthyRate = $(this).children('td:eq(11)').text();
        let freemil = $(this).children('td:eq(12)').text();
        let priceExtraKm = $(this).children('td:eq(13)').text();
        let colour = $(this).children('td:eq(14)').text();

        console.log(carId)
        console.log(brand)
        console.log(type)
        console.log(front)
        console.log(back)
        console.log(side)
        console.log(interior)
        console.log(passengers)
        console.log(trans)
        console.log(fuelType)
        console.log(dailyRate)
        console.log(monthyRate)
        console.log(freemil)
        console.log(priceExtraKm)
        console.log(colour)


        $('#carID').val(carId);
        $('#BrandName').val(brand);
        $('#Type').val(type);
        /*$('#frontView').val(front);
        $('#backView').val(back);
        $('#sideView').val(side);
        $('#interior').val(interior);*/
        $('#NumberOfPassengers').val(passengers);
        $('#TransmissionType').val(trans);
        $('#FuelType').val(fuelType);
        $('#DailyRate').val(dailyRate);
        $('#MonthlyRate').val(monthyRate);
        $('#FreeMileageForThePriceSndDuration').val(freemil);
        $('#PriceForExtraKM').val(priceExtraKm);
        $('#Color').val(colour);
    })
}

function loadAllCars(){
    $('#tblCar').empty();
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/',
        success:function (resp) {
            let response=resp.data
            for (var i in response ){
                let carId = response[i].registrationNumber;
                let bradName = response[i].bradName;
                let carType = response[i].carType;
                let img1 = response[i].img1;
                let img2 = response[i].img2;
                let img3 = response[i].img3;
                let img4 = response[i].img4;
                let numberOfPassenger = response[i].numberOfPassenger;
                let transmissionType = response[i].transmissionType;
                let fuelType = response[i].fuelType;
                let daiLRate = response[i].daiLRate;
                let monthlyRate = response[i].monthlyRate;
                let freeMileageForThePriceAndDuration = response[i].freeMileageForThePriceAndDuration;
                let priceOfExtraKm = response[i].priceOfExtraKm;
                let color = response[i].color;


                var row = `<tr><td>${carId}</td><td>${bradName}</td><td>${carType}</td><td>${img1}</td><td>${img2}</td><td>${img3}</td><td>${img4}</td><td>${numberOfPassenger}</td><td>${transmissionType}</td><td>${fuelType}</td><td>${daiLRate}</td><td>${monthlyRate}</td><td>${freeMileageForThePriceAndDuration}</td><td>${priceOfExtraKm}</td><td>${color}</td></tr>`;
                $('#tblCar').append(row);
            }
        }
    })
}

function generateCarId () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/',
        success:function (res) {
            let response=res.data
            console.log(res)
            let lastId = response[response.length-1].registrationNumber;
            let val = $('#carID').val("CA00" + (parseInt(lastId.split('CA00')[1])+1));
            console.log(val)
        }
    })
}

function cleartext(){
    $('#carID').val("");
    $('#BrandName').val("");
    $('#Type').val("");
    $('#frontView').val("");
    $('#backView').val("");
    $('#sideView').val("");
    $('#interior').val("");
    $('#NumberOfPassengers').val("");
    $('#TransmissionType').val("");
    $('#FuelType').val("");
    $('#DailyRate').val("");
    $('#MonthlyRate').val("");
    $('#FreeMileageForThePriceSndDuration').val("");
    $('#PriceForExtraKM').val("");
    $('#Color').val("");
}

let carIdRegEx = /^(CA0)[0-9]{1,2}$/;
let brandNameRegEx = /^[A-z]{1,}$/;
let carTypeRegEx = /^[A-z]{1,}$/;
let numberOfPassengerRegEx = /^[0-9]{1,}$/;
let transmissionTypeRegEx = /^[A-z]{1,}$/;
let fuelTypeRegEx = /^[A-z]{1,10}$/;
let dailyRateRegEx = /^[0-9]{1,}$/;
let monthlyRateRegEx = /^[0-9]{1,}$/;
let freeMileageRegEx = /^[0-9]{1,}[A-z]{1,2}$/;
let priceOfExtraKmRegEx = /^[0-9]{1,}$/;
let colorRegEx = /^[A-z]{1,10}$/;

$('#carID').on('keydown',function () {
    $('#lblCarID').text('CarID is a required  : (CA001)')

    if (event.key=="Enter"){
        $('#BrandName').focus();
        $('#lblBrandName').text('Brand Name is a required  : (A-z)')
    }

    var inputCarID = $('#carID').val();
    if (carIdRegEx.test(inputCarID)){
        if (checkCarId()){
            $("#lblCarID").text("");
        }else {
            $('#carID').css('');
            $("#lblCarID").text("");
        }
    }else {
        $('#carID').css('border', '2px solid red');
        $("#lblCarID").text("Aulk Thynw !");
    }
})

$('#BrandName').on('keydown',function () {
    if (event.key=="Enter"){
        $('#Type').focus();
        $('#lblType').text('Car Type is a required  : (General/Premium/Luxury)')
    }

    var inputType = $('#BrandName').val();
    if (brandNameRegEx.test(inputType)){
        if (checkCarId()){
            $("#lblBrandName").text("");
        }else {
            $('#BrandName').css('border', '2px solid blue');
            $("#lblBrandName").text("");
        }
    }else {
        $('#BrandName').css('border', '2px solid red');
        $("#lblBrandName").text("Aulk Thynw !");
    }
})

$('#Type').on('keydown',function () {
    if (event.key=="Enter"){
        $('#frontView').focus();
    }

    var inputType = $('#Type').val();
    if (carTypeRegEx.test(inputType)){
        if (checkCarId()){
            $("#lblType").text("");
        }else {
            $('#Type').css('border', '2px solid blue');
            $("#lblType").text("");
        }
    }else {
        $('#Type').css('border', '2px solid red');
        $("#lblType").text("Aulk Thynw !");
    }
})

$('#NumberOfPassengers').on('keydown',function () {
    if (event.key=="Enter"){
        $('#TransmissionType').focus();
        $('#lblTransmissionType').text('Transmission Type is a required  : (Auto/Manual)')
    }

    var inputNumberOfPassengers = $('#NumberOfPassengers').val();
    if (numberOfPassengerRegEx.test(inputNumberOfPassengers)){
        if (checkCarId()){
            $("#lblNumberOfPassengers").text("");
        }else {
            $('#NumberOfPassengers').css('border', '2px solid blue');
            $("#lblNumberOfPassengers").text("");
        }
    }else {
        $('#NumberOfPassengers').css('border', '2px solid red');
        $("#lblNumberOfPassengers").text("Aulk Thynw !");
    }
})

$('#TransmissionType').on('keydown',function () {
    if (event.key=="Enter"){
        $('#FuelType').focus();
        $('#lblFuelType').text('Fuel Type is a required  : (Desel/Petrol)')
    }

    var inputTransmissionType = $('#TransmissionType').val();
    if (transmissionTypeRegEx.test(inputTransmissionType)){
        if (checkCarId()){
            $("#lblTransmissionType").text("");
        }else {
            $('#TransmissionType').css('border', '2px solid blue');
            $("#lblTransmissionType").text("");
        }
    }else {
        $('#TransmissionType').css('border', '2px solid red');
        $("#lblTransmissionType").text("Aulk Thynw !");
    }
})

$('#FuelType').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DailyRate').focus();
        $('#lblDailyRate').text('Daily Rate is a required  : (0-9)')
    }

    var inputFuelType = $('#FuelType').val();
    if (fuelTypeRegEx.test(inputFuelType)){
        if (checkCarId()){
            $("#lblFuelType").text("");
        }else {
            $('#FuelType').css('border', '2px solid blue');
            $("#lblFuelType").text("");
        }
    }else {
        $('#FuelType').css('border', '2px solid red');
        $("#lblFuelType").text("Aulk Thynw !");
    }
})

$('#DailyRate').on('keydown',function () {
    if (event.key=="Enter"){
        $('#MonthlyRate').focus();
        $('#lblMonthlyRate').text('Monthly Rate is a required  : (0-9)')
    }

    var inputDailyRate = $('#DailyRate').val();
    if (dailyRateRegEx.test(inputDailyRate)){
        if (checkCarId()){
            $("#lblDailyRate").text("");
        }else {
            $('#DailyRate').css('border', '2px solid blue');
            $("#lblDailyRate").text("");
        }
    }else {
        $('#DailyRate').css('border', '2px solid red');
        $("#lblDailyRate").text("Aulk Thynw !");
    }
})

$('#MonthlyRate').on('keydown',function () {
    if (event.key=="Enter"){
        $('#FreeMileageForThePriceSndDuration').focus();
        $('#lblFreeMileageForThePriceSndDuration').text('FreeMileageForThePriceSndDuration is a required  : (100Km)')
    }

    var inputMonthlyRate = $('#MonthlyRate').val();
    if (monthlyRateRegEx.test(inputMonthlyRate)){
        if (checkCarId()){
            $("#lblMonthlyRate").text("");
        }else {
            $('#MonthlyRate').css('border', '2px solid blue');
            $("#lblMonthlyRate").text("");
        }
    }else {
        $('#MonthlyRate').css('border', '2px solid red');
        $("#lblMonthlyRate").text("Aulk Thynw !");
    }
})

$('#FreeMileageForThePriceSndDuration').on('keydown',function () {
    if (event.key=="Enter"){
        $('#PriceForExtraKM').focus();
        $('#lblPriceForExtraKM').text('PriceForExtraKM is a required  : (0-9)')
    }

    var inputFreeMileageForThePriceSndDuration = $('#FreeMileageForThePriceSndDuration').val();
    if (freeMileageRegEx.test(inputFreeMileageForThePriceSndDuration)){
        if (checkCarId()){
            $("#lblFreeMileageForThePriceSndDuration").text("");
        }else {
            $('#FreeMileageForThePriceSndDuration').css('border', '2px solid blue');
            $("#lblFreeMileageForThePriceSndDuration").text("");
        }
    }else {
        $('#FreeMileageForThePriceSndDuration').css('border', '2px solid red');
        $("#lblFreeMileageForThePriceSndDuration").text("Aulk Thynw !");
    }
})

$('#PriceForExtraKM').on('keydown',function () {
    if (event.key=="Enter"){
        $('#Color').focus();
        $('#lblColor').text('Color is a required  : (A-z)')
    }

    var inputPriceOfExtra = $('#PriceForExtraKM').val();
    if (priceOfExtraKmRegEx.test(inputPriceOfExtra)){
        if (checkCarId()){
            $("#lblPriceForExtraKM").text("");
        }else {
            $('#PriceForExtraKM').css('border', '2px solid blue');
            $("#lblPriceForExtraKM").text("");
        }
    }else {
        $('#PriceForExtraKM').css('border', '2px solid red');
        $("#lblPriceForExtraKM").text("Aulk Thynw !");
    }
})

$('#Color').on('keydown',function () {
    if (event.key=="Enter"){
        $('#btnSaveCar').focus();
    }

    var inputColor = $('#Color').val();
    if (colorRegEx.test(inputColor)){
        if (checkCarId()){
            $("#lblColor").text("");
        }else {
            $('#Color').css('border', '2px solid blue');
            $("#lblColor").text("");
        }
    }else {
        $('#Color').css('border', '2px solid red');
        $("#lblColor").text("Aulk Thynw !");
    }
})

function checkCarId(){
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Car/`,

        success:function (resp) {
            let response=resp.data
            console.log(response.carId)
        }
    })

}

function clearAll(){
    $('#carID').css("");

    $('#BrandName').css("");

    $('#Type').css("");

    $('#NumberOfPassengers').css("");

    $('#TransmissionType').css("");

    $('#FuelType').css("");

    $('#DailyRate').css("");

    $('#MonthlyRate').css("");

    $('#FreeMileageForThePriceSndDuration').css("");

    $('#PriceForExtraKM').css("");

    $('#Color').css("");
}

/*--------------------Driver Manage----------------------------*/

$('#btnSaveDriver').click(function () {
    let id = $('#DriverID').val();
    let nicNumber = $('#DriverNICNumber').val();
    let name = $('#DriverName').val();
    let address = $('#DriverAddress').val();
    let email = $('#DriverEmail').val();
    let contactNumber = $('#DriverContactNumber').val();
    let password = $('#DriverPassword').val();

    $.ajax({
        method:"POST",
        url:"http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver",
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            driverID:id,
            driverNIC:nicNumber,
            driverName:name,
            driverAddress:address,
            driverEmail:email,
            driverContact:contactNumber,
            driverPassword:password
        }),
        success:function (data) {
            console.log(data)
            alert(id + "Saved Success");
            clearText();
            loadAllDrivers ();
            generateDriverId();
        },
        error:function (data) {
            let response=data.massage;
            alert(response);
        }
    })
})

$('#btnSearchDriver').click(function () {
    let id = $('#DriverID').val();

    $.ajax({
        method: 'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver/${id}`,
        success:function (resp) {
            let response=resp.data

            //console.log(response=resp.data)
            /*console.log(response.driver_Address)
            console.log(response.driver_Email)*/

            confirm("Do you Want to Search "+id+"")
            $('#DriverNICNumber').val(response.driverNIC);
            $('#DriverName').val(response.driverName);
            $('#DriverAddress').val(response.driverAddress);
            $('#DriverEmail').val(response.driverEmail);
            $('#DriverContactNumber').val(response.driverContact);
            $('#DriverPassword').val(response.driverPassword);
        }
    })
})

$('#btnDriverUpdate').click(function () {
    let id = $('#DriverID').val();
    let nicNumber = $('#DriverNICNumber').val();
    let name = $('#DriverName').val();
    let address = $('#DriverAddress').val();
    let email = $('#DriverEmail').val();
    let contactNumber = $('#DriverContactNumber').val();
    let password = $('#DriverPassword').val();

    $.ajax({
        method:"PUT",
        url:"http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver",
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            driverID:id,
            driverNIC:nicNumber,
            driverName:name,
            driverAddress:address,
            driverEmail:email,
            driverContact:contactNumber,
            driverPassword:password
        }),
        success:function (data) {
            console.log(data)
            $('#DriverTbl').empty();
            loadAllDrivers ();
            alert(id +" Update Succes")
            clearText();
            generateDriverId();
        }
    })
})

$('#btnDeleteDriver').click(function () {
    let id = $('#DriverID').val();
    $.ajax({
        method:'DELETE',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver/?id=${id}`,

        success:function () {
            confirm("Are You Sure!")
            loadAllDrivers();
            clearText();
            generateDriverId();
        }
    })
})

$('#btnGetAllDriver').click(function () {
    clickDriverTblRow();
})

function loadAllDrivers () {
    $('#DriverTbl').empty();
    $.ajax({
        method: 'GET',
        url:"http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver/",
        success:function (resp) {
            let response=resp.data
            for ( var i in response) {
                //console.log(response[i].driverID)
                let id =(response[i].driverID)
                let nic =(response[i].driverNIC)
                let name =(response[i].driverName)
                let address =(response[i].driverAddress)
                let email =(response[i].driverEmail)
                let contactNumber =(response[i].driverContact)
                let password =(response[i].driverPassword)

                var row = `<tr><td>${id}</td><td>${nic}</td><td>${name}</td><td>${address}</td><td>${email}</td><td>${contactNumber}</td><td>${password}</td></tr>`;
                $('#DriverTbl').append(row);
            }
        }
    })
}

function clickDriverTblRow () {
    $('#DriverTbl>tr').click(function () {
        let driverId = $(this).children('td:eq(0)').text();
        let driverNIC = $(this).children('td:eq(1)').text();
        let driverName = $(this).children('td:eq(2)').text();
        let driverAddress = $(this).children('td:eq(3)').text();
        let driverEmail = $(this).children('td:eq(4)').text();
        let driverContactNumber = $(this).children('td:eq(5)').text();
        let DriverPassword = $(this).children('td:eq(6)').text();


        console.log(driverId)
        console.log(driverNIC)
        console.log(driverName)
        console.log(driverAddress)
        console.log(driverEmail)
        console.log(driverContactNumber)
        console.log(DriverPassword)

        $('#DriverID').val(driverId);
        $('#DriverNICNumber').val(driverNIC);
        $('#DriverName').val(driverName);
        $('#DriverAddress').val(driverAddress);
        $('#DriverEmail').val(driverEmail);
        $('#DriverContactNumber').val(driverContactNumber);
        $('#DriverPassword').val(DriverPassword);

    })
}

function generateDriverId () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver',
        success:function (resp) {
            let response=resp.data;
            let lastId = response[response.length-2].driverID;
            let val = $('#DriverID').val("D00" + (parseInt(lastId.split('D00')[1])+1));
            console.log(val)
        }
    })
}

function clearText () {
    $('#DriverID').val("");
    $('#DriverNICNumber').val("");
    $('#DriverName').val("");
    $('#DriverAddress').val("");
    $('#DriverEmail').val("");
    $('#DriverContactNumber').val("");
    $('#DriverPassword').val("");
}

let driverIdRegEx = /^(D0)[0-9]{1,2}$/;
let driverNICRegEx = /^[0-9]{11}$/;
let driverNameRegEx = /^[A-z]{1,}$/;
let driverAddressRegEx = /^[A-z]{1,}$/;
let driverEmailRegEx = /^[a-z]{1,}(@){1}[a-z]{1,}(.com){1}$/;
let driverContactNumberRegEx = /^[0-9]{10}$/;
let driverPasswordRegEx = /^[A-z]{1,5}$/;


$('#DriverID').on('keydown',function () {
    $('#lblDriverID').text('DriverID is a required  : (D001)')
    if (event.key=="Enter"){
        $('#DriverNICNumber').focus();
        $('#lblDriverNICNumber').text('NIC Number is a required  : (0-9)')
    }

    var inputDriverID = $('#DriverID').val();
    if (driverIdRegEx.test(inputDriverID)){
        if (checkCarId()){
            $("#lblDriverID").text("");
        }else {
            $('#DriverID').css('border', '2px solid blue');
            $("#lblDriverID").text("");
        }
    }else {
        $('#DriverID').css('border', '2px solid red');
        $("#lblDriverID").text("Aulk Thynw !");
    }
})

$('#DriverNICNumber').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DriverName').focus();
        $('#lblDriverName').text('Driver Name is a required  : (A-z)')
    }

    var inputDriverNICNumber = $('#DriverNICNumber').val();
    if (driverNICRegEx.test(inputDriverNICNumber)){
        if (checkCarId()){
            $("#lblDriverNICNumber").text("");
        }else {
            $('#DriverNICNumber').css('border', '2px solid blue');
            $("#lblDriverNICNumber").text("");
        }
    }else {
        $('#DriverNICNumber').css('border', '2px solid red');
        $("#lblDriverNICNumber").text("Aulk Thynw !");
    }
})

$('#DriverName').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DriverAddress').focus();
        $('#lblDriverAddress').text('Driver Address is a required  : (A-z)')
    }

    var inputDriverName = $('#DriverName').val();
    if (driverNameRegEx.test(inputDriverName)){
        if (checkCarId()){
            $("#lblDriverName").text("");
        }else {
            $('#DriverName').css('border', '2px solid blue');
            $("#lblDriverName").text("");
        }
    }else {
        $('#DriverName').css('border', '2px solid red');
        $("#lblDriverName").text("Aulk Thynw !");
    }
})

$('#DriverAddress').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DriverEmail').focus();
        $('#lblDriverEmail').text('Driver Email is a required  : (sample@sample.sample)')
    }

    var inputDriverAddress = $('#DriverAddress').val();
    if (driverAddressRegEx.test(inputDriverAddress)){
        if (checkCarId()){
            $("#lblDriverAddress").text("");
        }else {
            $('#DriverAddress').css('border', '2px solid blue');
            $("#lblDriverAddress").text("");
        }
    }else {
        $('#DriverAddress').css('border', '2px solid red');
        $("#lblDriverAddress").text("Aulk Thynw !");
    }
})

$('#DriverEmail').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DriverContactNumber').focus();
        $('#lblDriverContactNumber').text('Driver Contact Number is a required  : (0-9)')
    }

    var inputDriverEmail = $('#DriverEmail').val();
    if (driverEmailRegEx.test(inputDriverEmail)){
        if (checkCarId()){
            $("#lblDriverEmail").text("");
        }else {
            $('#DriverEmail').css('border', '2px solid blue');
            $("#lblDriverEmail").text("");
        }
    }else {
        $('#DriverEmail').css('border', '2px solid red');
        $("#lblDriverEmail").text("Aulk Thynw !");
    }
})

$('#DriverContactNumber').on('keydown',function () {
    if (event.key=="Enter"){
        $('#DriverPassword').focus();
        $('#lblDriverPassword').text('Driver Password is a required  : (First Letter is capital And All Are 5 letters)')
    }

    var inputDriverContactNumber = $('#DriverContactNumber').val();
    if (driverContactNumberRegEx.test(inputDriverContactNumber)){
        if (checkCarId()){
            $("#lblDriverContactNumber").text("");
        }else {
            $('#DriverContactNumber').css('border', '2px solid blue');
            $("#lblDriverContactNumber").text("");
        }
    }else {
        $('#DriverContactNumber').css('border', '2px solid red');
        $("#lblDriverContactNumber").text("Aulk Thynw !");
    }
})

$('#DriverPassword').on('keydown',function () {
    if (event.key=="Enter"){
        $('#btnSaveDriver').focus();
    }

    var inputDriverPassword = $('#DriverPassword').val();
    if (driverPasswordRegEx.test(inputDriverPassword)){
        if (checkCarId()){
            $("#lblDriverPassword").text("");
        }else {
            $('#DriverPassword').css('border', '2px solid blue');
            $("#lblDriverPassword").text("");
        }
    }else {
        $('#DriverPassword').css('border', '2px solid red');
        $("#lblDriverPassword").text("Aulk Thynw !");
    }
})

