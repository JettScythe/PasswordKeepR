const renderPasswords = () => {$.ajax({
    type: 'GET',
    url: '/passwords/new',
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






$('.toggle_add_account').on('click', () => {
  return $('.add_account').slideToggle();
});


























$('.add_new').submit(event => {
  // alert('succes...');
  // console.log('this works');
  // const data = $(this).serialize();
  const name = $('#web_name').val();
  const username = $('#web_username').val();
  const password = $('#new_password').val();
  console.log('msg:', web_name);
  event.preventDefault();
  $.post('/passwords/new', { name, username, password })
  .then((res) => {
    $('.passwords_container').empty();
    console.log('response from submit:', res);
    renderPasswords();
  }).catch(err => {
    console.log('error from ajax request:', err);
  })
})
