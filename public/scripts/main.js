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
            <button class="btn btn-primary" type="button">edit</button>
            <form action="/passwords/edit" method="post" autocomplete="off" autofill="off" class='add_new'>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      name="website_name"
      placeholder="Website Name"
    />
  </div>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      name="website_username"
      placeholder="username"
    />
  </div>
  <div class="form-group">
    <input
      type="password"
      class="form-control"
      name="website_password"
      id = "new_password"
      placeholder="password"
    />

  </div>

  <button class="btn btn-primary" type="submit">Add Password</button>
</form>
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
