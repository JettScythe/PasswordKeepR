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
            <button class="btn btn-primary toggle_edit" type="button">edit</button>
            <form method="post" autocomplete="off" autofill="off" class='edit_info'>
              <div class="form-group">
                <input
                  type="text"
                  class="web_name"
                  name="website_name"
                  placeholder="Website Name"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="username"
                  name="website_username"
                  placeholder="username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="password"
                  name="website_password"
                  placeholder="password"
                />
              </div>
              <button class="btn btn-primary" type="submit">Add Password</button>
            </form>
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
  event.preventDefault();
  $.post('/passwords/new', { name, username, password })
  .then((res) => {
    $('.passwords_container').empty();
    renderPasswords();
  }).catch(err => {
    console.log('error from submit new password request:', err);
  })
})

$('.passwords_container').on('submit', '.edit_info', (event) => {
  event.preventDefault();
  const web_name = $('.web_name').val();
  const username = $('.username').val();
  const password = $('.password').val();
  console.log('submitted edit info form successfully');
  console.log('from within ajax:', web_name, username, password);
  $.post('/passwords/edit', { web_name, username, password })
  .then((res) => {
    $('.passwords_container').empty();
    renderPasswords();
  }).catch(err => {
    console.log('error from edit password request:', err);
  })
});


$('.passwords_container').on('click', '.toggle_edit', (event) => {
  console.log('event within toggle', event);
  console.log('this', $(this), typeof $(this)['0'].confirm);
  return $(this).slideToggle();
})
