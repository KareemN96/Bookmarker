var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var dataContain = [];

if (localStorage.getItem("storageData") != null) {
  dataContain = JSON.parse(localStorage.getItem("storageData"));
  displayData();
}

function getData() {
  var siteData = {
    s_Name: siteName.value.toLowerCase(),
    s_Url: siteUrl.value.toLowerCase(),
  };
  for (var i = 0; i < dataContain.length; i++) {
    if (
      siteData.s_Name === dataContain[i].s_Name &&
      siteData.s_Url === dataContain[i].s_Url
    ) {
      swal("⚠️Warning⚠️", "Site Name & Url is Duplicated", { icon: "warning" });
      siteName.classList.add("is-invalid");
      siteUrl.classList.add("is-invalid");
      siteName.value = "";
      siteUrl.value = "";
      return;
    }
  }
  if (siteData.s_Name && siteData.s_Url) {
    dataContain.push(siteData);
    localStorage.setItem("storageData", JSON.stringify(dataContain));
    displayData();
    siteName.value = "";
    siteUrl.value = "";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  }
}

function displayData() {
  var dataCollected = ``;
  for (var i = 0; i < dataContain.length; i++) {
    dataCollected += `<tr>
          <td>${[i + 1]}</td>
          <td>${dataContain[i].s_Name}</td>
          <td>
            <button
              class="btn btn-success border-0"
              style="background-color: #8a9e23"
            >
              <a href="https://${
                dataContain[i].s_Url
              }" class="text-decoration-none text-white">
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </a>
            </button >
          </td>
          <td>
            <button class="btn btn-danger border-0" onclick="deleteItem(${i})">
            <i class="fa-solid fa-trash pe-2"></i>Delete
            </button>
          </td>
    </tr>`;
  }
  document.getElementById("dis_Data").innerHTML = dataCollected;
}

function deleteItem(index) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your file has been deleted!", {
        icon: "success",
      });
      dataContain.splice(index, 1);
      localStorage.setItem("storageData", JSON.stringify(dataContain));
      displayData();
    } else {
      swal({ title: "Your file is safe!" });
    }
  });
}

function validateData(element) {
  var regex = {
    siteName: /^[A-z][a-z]{2,}$/,
    siteUrl: /^www.[a-z]{2,}.com$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
