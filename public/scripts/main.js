
$.ajax({
  type: 'GET',
  url: '/api/passwords',
  success: function(passwords) {
    console.log('success', passwords);
    console.log(typeof passwords);
    $.each(passwords, (index, password) => {
      $('.passwords_container').append(`
        <div class='display_password'>
          <header>${password.website_name}</header>
          ${password.website_password}
        </div>
      `);
    })
  }
})
