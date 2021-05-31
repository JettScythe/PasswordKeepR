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
            <form method="POST" autocomplete="off" autofill="off" class='edit_info_${index}'>
              <div class="form-group">
                <input
                  type="text"
                  class="web_name_${index}"
                  name="website_name"
                  placeholder="Website Name"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="username_${index}"
                  name="website_username"
                  placeholder="username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="password_${index}"
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



$('.passwords_container').on('click', '.toggle_edit', (event) => {
  $(event.currentTarget.nextElementSibling).slideToggle();

  const form = $(event.currentTarget.nextElementSibling).attr('class');
  const index = form.slice(-1);
  console.log('index:', index);

  $('.passwords_container').on('submit', `.edit_info_${index}`, (event) => {
    event.preventDefault();
    console.log(`this event is: ${event.currentTarget}`)
    const web_name = $(`.web_name_${index}`).val();
    const username = $(`.username_${index}`).val();
    const password = $(`.password_${index}`).val();
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
  return;
})
