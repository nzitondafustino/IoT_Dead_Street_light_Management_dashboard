function update(event){
    var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
    var lamp = devices.filter((device)=>{
        return device.SN.trim() == serialNumber.trim();
    })
        $('#SNu').val(lamp[0].SN);
        $('#phoneu').val(lamp[0].phone);
        $('#locationu').val(lamp[0].location);
        $('#roadu').val(lamp[0].road);
        $('#lamp_numberu').val(lamp[0].lampNumber);
        var updateForm = document.getElementById('updateForm');
        updateForm.setAttribute('action','/admin/update-device/' + lamp[0]._id);
  }

function view(event){
 var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
 var lamp = devices.filter((device)=>{
     return device.SN.trim() == serialNumber.trim();
 })
        $('#SN').html('Serial Number: ' + lamp[0].SN);
        $('#phone').html('Phone: ' + lamp[0].phone);
        $('#voltage').html('Voltage: ' + lamp[0].voltage + "V");
        $('#current').html('Current: ' + lamp[0].current + "A");
        $('#brightness').html('Brightness: ' + lamp[0].brightness + "%");
        $('#location').html('Loacation: ' + lamp[0].location);
        $('#road').html('Road: ' + lamp[0].road);
        $('#lamp').html('Lamp Number: ' + lamp[0].lampNumber);
}
function deleteDevice(event){
    var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
    var lamp = devices.filter((device)=>{
        return device.SN.trim() == serialNumber.trim();
    })
    var deleteForm = document.getElementById('deleteForm');
    deleteForm.setAttribute('action','/admin/delete-device/' + lamp[0]._id);
}
function viewUser(event){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
       return user.email.trim() == email.trim();
    })
    $('#first').html('First Name: ' + user[0].first_name);
    $('#last').html('Last Name: ' + user[0].last_name);
    $('#email').html('E-mail: ' + user[0].email);
    $('#role').html((user[0].role==1)?"Role: Admin":"Role: Normal");
}
function updateUser(event){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
       return user.email.trim() == email.trim();
    });
    var updateForm = document.getElementById('updateForm');
    updateForm.setAttribute('action','/admin/update-user/' + user[0]._id);
    $('#firstu').val(user[0].first_name);
    $('#lastu').val( user[0].last_name);
    $('#emailu').val(user[0].email);
}
function deleteUser(){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
        return user.email.trim() == email.trim();
     });
    var deleteForm = document.getElementById('deleteForm');
    deleteForm.setAttribute('action','/admin/delete-user/' + user[0]._id);

}
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });