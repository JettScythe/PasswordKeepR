$('.detail_email').on('click', () => {
  $('.edit_email').toggle();
  $('.detail_email').off('click');
})
$('.email_cancel').on('click', () => {
    $('.edit_email').toggle();
})



$('.detail_name').on('click', (event) => {
  $('.edit_name').toggle();
  $('.detail_name').off('click');
})

$('.detail_password').on('click', (event) => {
  $('.edit_password').toggle();
  $('.detail_password').off('click');
})
