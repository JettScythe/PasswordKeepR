//edit email
$('.edit_email.edit_button').on('click', () => {
  $('.edit_email').toggle();
  $('.new_email').focus();
})
$('.email_cancel').on('click', () => {
    $('.edit_email').toggle();
})
$('.detail_email').on('submit', (event) => {
  event.preventDefault();
  const email = $('.new_email').val();
  $.post('/passwords/account_info/email', { email })
  .then(() => {
    $('.edit_email').css('display','none');
    $('.detail_email').children().eq(1).html(`${email}`);
    $('.edit_email.edit_button').fadeIn();
    $('.detail_email').children().eq(1).fadeIn();
  }).catch(err => console.log('update email error:', err));
  return;
})

//edit password
$('.edit_password.edit_button').on('click', () => {
  $('.edit_password').toggle();
  $('.new_password').focus();
})
$('.password_cancel').on('click', () => {
    $('.edit_password').toggle();
})
$('.detail_password').on('submit', (event) => {
  event.preventDefault();
  const password = $('.new_password').val();
  $.post('/passwords/account_info/password', { password })
  .then(() => {
    $('.edit_password').css('display','none');
    $('.edit_password.edit_button').fadeIn();
    $('.detail_password').children().eq(1).fadeIn();
  }).catch(err => console.log('update password error:', err));
  return;
})


//edit name
$('.edit_name.edit_button').on('click', () => {
  $('.edit_name').toggle();
  $('.new_name').focus();
})
$('.name_cancel').on('click', () => {
    $('.edit_name').toggle();
})
$('.detail_name').on('submit', (event) => {
  event.preventDefault();
  const name = $('.new_name').val();
  $.post('/passwords/account_info/name', { name })
  .then(() => {
    $('.edit_name').css('display','none');
    $('.detail_name').children().eq(1).html(`${name}`);
    $('.edit_name.edit_button').fadeIn();
    $('.detail_name').children().eq(1).fadeIn();
  }).catch(err => console.log('update name error:', err));
  return;
})

