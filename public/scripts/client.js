$('.login_form form.').submit(function(event) {
  const msg = $(this).serialize();
  console.log('msg from form:', msg);
  return;
})
