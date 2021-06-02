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
          <div class='delete'>
          <form method="POST" autocomplete="off" autofill="off" class="delete_${index}">
            <button class="btn btn-danger" type="submit"><i class="fas fa-trash"></i></button>
          </form>
          </div>
        </div>


        <header class='website_name_${index}'>${password.website_name}</header>
        <p>username: ${password.website_username}</p>
        <div class = "password-field">
        <p class="password_${index}">password: ${password.website_password}</p>
        <div class="copy">
          <button class="copy_${index}"><i class="fas fa-clipboard"></i></button>
        </div>
        </div>


        <button class="btn btn-primary toggle_edit" type="button">edit</button>

        <form method="POST" autocomplete="off" autofill="off" class='edit_info_${index}'>
        <section>
        <span class="close">&times;</span>
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
  return $(".add_account").slideToggle("fast");
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
  $(event.currentTarget.nextElementSibling).fadeToggle("normal");

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

  $(window).on("click", (event) => {
    if (event.target !== $(`.edit_info_${index}`)) {
      $(`.edit_info_${index}`)[0].style.display = "none";
    }
  });

  return;
});

const copybtnDOM = document.getElementById("copy");

$(".passwords_container").on("click", ".copy", (event) => {
  event.preventDefault();

  const classOfButton = $(event.currentTarget.children[0]).attr("class");

  //this is only going to work if the index is single digit. will have to fix this
  const index = classOfButton.slice(-1);

  const passwordToCopy = $(`.password_${index}`).text().slice(10);

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

$(".passwords_container").on("submit", `.delete`, (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  const index = $(event.target).attr("class").slice(-1);
  const website = $(`.website_name_${index}`)[0].outerText;

  $.post("/passwords/delete", { website })
    .then((res) => {
      $(".passwords_container").empty();
      renderPasswords();
    })
    .catch((err) => {
      console.log("error from edit password request:", err);
    });
});
