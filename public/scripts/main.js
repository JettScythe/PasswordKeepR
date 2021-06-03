const renderPasswords = () => {
  $.ajax({
    type: "GET",
    url: "/passwords/new",
    success: function (passwords) {
      $.each(passwords, (index, password) => {
        $(".passwords_container").append(`

        <div class='display_password'>


        <div class="passwords-header">
          <p>${password.catagory_name}</p>

          <div class='edit_delete'>
            <span class="toggle_edit" type="button"><i class="far fa-edit"></i></span>
            <form method="POST" autocomplete="off" autofill="off" class="delete_${index}">
              <span class="toggle_delete" type="submit"><i class="far fa-trash-alt"></i></span>
            </form>
          </div>
        </div>


        <header class='website_name_${index}'>${password.website_name}</header>

        <p class='display_username'>${password.website_username}</p>

        <div class = "password-field">
          <p class="password_${index}">
         <span class="hide">${password.website_password}</span>
          <span class="secret">********<span>
          </p>
          <div class="copy">
            <button class="copy_${index}"><i class="fas fa-clipboard"></i></button>
          </div>
        </div>



        <form method="POST" autocomplete="off" autofill="off" class='edit_info_${index}'>
          <section>
            <span class="close">&times;</span>
            <h3>${password.website_name}</h3>
            <div class="form-group">
              <input
                type="text"
                class="username_${index} form-control"
                name="website_username"
                placeholder="username"
              />
              <input
                type="password"
                class="password_${index} form-control"
                name="website_password"
                placeholder="password"
              />
            </div>
            <button class="btn btn-primary" type="submit">Edit Password</button>
          </section>
        </form>


      </div>
        `);
      });
    },
  });
};

renderPasswords();

$(".toggle_add_account").on("click", () => {
  $('.add_new')[0].reset();
  return $(".add_account").fadeToggle("fast");
});

$(".add_new").submit((event) => {
  const name = $("#web_name").val();
  const username = $("#web_username").val();
  const password = $("#new_password").val();
  const category = $("#category_name").val();
  event.preventDefault();
  $.post("/passwords/new", { name, username, password, category })
    .then((res) => {
      $(".passwords_container").empty();
      $(".add_account").fadeToggle();
      renderPasswords();
    })
    .catch((err) => {
      console.log("error from submit new password request:", err);
    });
});

$(".add_new").on("click", ".close", () => {
  $(".add_account")[0].style.display = "none";
});

//sends request to edit an existing website account
$(".passwords_container").on("click", ".toggle_edit", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  // $(event.currentTarget.nextElementSibling).fadeToggle("normal");
  const target = $(
    event.currentTarget.parentElement.parentElement.parentElement
  )
    .children()
    .eq(4)
    .attr("class");
  $(`.${target}`).fadeToggle("normal");

  const form = $(event.currentTarget.nextElementSibling).attr("class");
  const index = form.slice(-1);

  $(".passwords_container").on("submit", `.edit_info_${index}`, (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    const website = event.target.parentElement.childNodes[3].innerHTML;
    const username = $(`.username_${index}`).val();
    const password = $(`.password_${index}`)[1].value;
    $.post("/passwords/edit", { website, username, password })
      .then((res) => {
        $(".passwords_container").empty();
        renderPasswords();
      })
      .catch((err) => {
        console.log("error from edit password request:", err);
      });
  });

  $(".passwords_container").on("click", `.close`, (event) => {
    $(`.edit_info_${index}`)[0].style.display = "none";
  });

  // $(window).on("click", (event) => {
  //   if (event.target !== $(`.edit_info_${index}`)) {
  //     $(`.edit_info_${index}`)[0].style.display = "none";
  //   }
  // });

  return;
});

const copybtnDOM = document.getElementById("copy");

//copy password
$(".passwords_container").on("click", ".copy", (event) => {
  event.preventDefault();

  const classOfButton = $(event.currentTarget.children[0]).attr("class");

  //this is only going to work if the index is single digit. will have to fix this
  const index = classOfButton.slice(-1);

  const passwordToCopy = $(`.password_${index}`).text().split("         ")[1];

  // Edge Case when Password is Empty
  if (!passwordToCopy) return;

  // Copy Functionality

  const test = document.createElement("textarea");
  document.body.appendChild(test);
  test.value = passwordToCopy;

  test.select();
  document.execCommand("copy");
  document.body.removeChild(test);
});

$(".passwords_container").on("click", `.toggle_delete`, (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  // const index = $(event.target).attr("class").slice(-1);
  // const website = $(`.website_name_${index}`)[0].outerText;

  const target = $(
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
  )
    .children()
    .eq(1)
    .attr("class");
  website = $("." + target)[0].outerText;

  $.post("/passwords/delete", { website })
    .then((res) => {
      $(".passwords_container").empty();
      renderPasswords();
    })
    .catch((err) => {
      console.log("error from edit password request:", err);
    });
});
