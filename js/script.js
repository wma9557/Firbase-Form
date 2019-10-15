$(document).ready(function(){
  $('.btn-signUp').click(function() {
    $('.signIn').addClass('remove-section');
    $('.signUp').removeClass('active-section');
    $('.btn-signUp').removeClass('active');
    $('.btn-signIn').addClass('active');
  });
  
  $('.btn-signIn').click(function() {
    $('.signIn').removeClass('remove-section');
    $('.signUp').addClass('active-section');	
    $('.btn-signUp').addClass('active');
    $('.btn-signIn').removeClass('active');
  });

  // form complete
  
  
  // firebase

  // authentication
  // signUp
  $("#signup").click(function(){
    let email = $(".signUp #email").val();
    let password = $(".signUp #password").val();
    let password_confirm = $(".signUp #password_confirm").val();
    if(password==password_confirm){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        console.log(user);
      })
      .catch(function(error) {
        alert(error.message);
      });
    }
  });
  
  // signIn
  $("#signin").click(function(){
    let email = $(".signIn #email").val();
    let password = $(".signIn #password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
      window.location.href = "pages/form.html"
    })
    .catch(function(error) {
      alert(error.message);
    });
  });

  // signout
  $("#signout").click(function(){
    firebase.auth().signOut();
  });

  // database
  // add data
  $(".form #add").click(function(){
    let name = $("#name").val();
    let fName = $("#fName").val();
    let age = $("#age").val();
    let email = $("#email").val();
    let number = $("#number").val();
    let address = $("#address").val();
    let city = $("#city").val();
    let zip = $("#zip").val();
    
    firebase.database().ref().child('/Users/').push({
      name : name,
      fName : fName,
      age : age,
      email : email,
      number : number,
      address : address,
      city : city,
      zip : zip
    });
    location.reload();
  });
  
  // update add remove
  function update_add_remove(){
    let key;
    let update_data = function() {
      key = $(this).data('key');
      let databaseRef = firebase.database().ref("/Users/");
      databaseRef.on('value',getdata);
      function getdata(data){
        userData = data.val();
      }
      $("#fName").val(userData[key].fName).focus();
      $("#age").val(userData[key].age).focus();
      $("#email").val(userData[key].email).focus();
      $("#number").val(userData[key].number).focus();
      $("#address").val(userData[key].address).focus();
      $("#city").val(userData[key].city).focus();
      $("#zip").val(userData[key].zip).focus();
      $("#name").val(userData[key].name).focus();
    }
    
    $(document).on('click', '.update', update_data);

    $(".form #update").click(function(){
      if(key){
        let name = $("#name").val();
        let fName = $("#fName").val();
        let age = $("#age").val();
        let email = $("#email").val();
        let number = $("#number").val();
        let address = $("#address").val();
        let city = $("#city").val();
        let zip = $("#zip").val();
      
        firebase.database().ref().child('/Users/' + key).update({
          name : name,
          fName : fName,
          age : age,
          email : email,
          number : number,
          address : address,
          city : city,
          zip : zip
        });
        location.reload();
      }
    });
    $(".form #remove").click(function(){
      if(key){
        firebase.database().ref().child('/Users/' + key).remove();
        location.reload();
      }
    });
  }
  update_add_remove();

  
  // remove data
  let remove_data = function() {
    let key = $(this).data('key');
    firebase.database().ref().child('/Users/' + key).remove();
    location.reload();
  }
  $(document).on('click', '.remove', remove_data);

  // show data
  function show_data_in_tabel(){
    let databaseRef = firebase.database().ref("/Users/");
    databaseRef.on('value',getdata);
    function getdata(data){
      let userData = data.val();
      let keys = Object.keys(userData);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let name = userData[key].name;
        let fName = userData[key].fName;
        let age = userData[key].age;
        let email = userData[key].email;
        let number = userData[key].number;
        let address = userData[key].address;
        let city = userData[key].city;
        let zip = userData[key].zip;
        $(".data_table #tbody").append("<tr><th scope='row'>"+(i+1)+"</th><td>"+name+"</td><td>"+fName+"</td><td>"+age+"</td><td>"+email+"</td><td>"+number+"</td><td>"+address+"</td><td>"+city+"</td><td>"+zip+"</td><td><button class='update' data-key='"+key+"'><i class='fas fa-pencil-alt'></i></button><button class='remove' data-key='"+key+"'><i class='fas fa-times'></i></button></td></tr>");
      }
    }
  }
  show_data_in_tabel();

});






