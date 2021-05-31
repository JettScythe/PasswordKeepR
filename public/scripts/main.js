const renderPasswords = () => {$.ajax({
    type: 'GET',
    url: '/api/passwords',
    success: function(passwords) {
      $.each(passwords, (index, password) => {
        $('.passwords_container').append(`
          <div class='display_password'>
            <header>website: ${password.website_name}</header>
            <p>username: ${password.website_username}</p>
            <p>password: ${password.website_password}</p>
          </div>
        `);
      })
    }
  })
}

renderPasswords();

// $('.add_account form').submit(event => {
//   console.log('this works');
//   const data = $(this).serialize();
//   console.log('msg:', data);
//   // event.preventDefault();
//   $.post('/api/passwords', $(this).serialize())
//   .then(() => {
//     $('.passwords_container').empty();
//     renderPasswords()
//   })
// })

// $.ajax({
//   type: 'POST',
//   url: '/api/passwords',
//   success: function(data) {
//     $('.passwords_container').empty();
//     renderPasswords();
//   }
// })


$('.toggle_add_account').on('click', () => {
  return $('.add_account').slideToggle();
});
