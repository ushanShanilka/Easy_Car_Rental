let DriverSheduel = document.getElementById('driverShedul');
DriverSheduel.style.display='none';

let Login = document.getElementById('login');

$('#btnLoginDriver').click(function () {
    let driverId = $('#driverLoginID').val();
    let driverPassword = $('#driverLoginPassword').val();

    $.ajax({
        method : 'GET',
        url:`http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/Driver/find/${driverId}/${driverPassword}`,

        success:function (resp) {
            let response= resp.data;
            console.log(response)
            if (response.driverPassword==driverPassword){
                Login.style.display='none'
                DriverSheduel.style.display='block'
                loadAllBookingByDriverID();
            }else {
                alert("Ehema Collec Ne")
            }

        }
    })
})

function loadAllBookingByDriverID () {
    $('#tblDriverSheduel').empty();
    let driverId = $('#driverLoginID').val();

    console.log(driverId);
    $.ajax({
        method: 'GET',
        url: `http://localhost:8080/Easy_Car_BackEnd_war_exploded/api/v1/booking/getDrivers/${driverId}/`,

        success:function (resp) {
            let response= resp.data;
            $('#navBarDriverId').val($('#driverLoginID').val())

            for ( var i in response) {

                let reqId = (response[i].reqId)
                let cusId = (response[i].cusId)
                let withDriverOrWithOutDriver = (response[i].withDriverOrWithOutDriver)
                let pickupLocation = (response[i].pickupLocation)
                let pickupDate = (response[i].pickupDate)
                let pickupTime = (response[i].pickupTime)
                let returnDate = (response[i].returnDate)
                let vehicleType = (response[i].vehicleType)
                let driverId = (response[i].driverId)
                let acceptOrReject = (response[i].acceptOrReject)

                var row = `<tr><td>${pickupLocation}</td><td>${pickupDate}</td><td>${pickupTime}</td><td>${returnDate}</td><td>${vehicleType}</td></tr>`;
                $('#tblDriverSheduel').append(row);
            }
        }
    })
}